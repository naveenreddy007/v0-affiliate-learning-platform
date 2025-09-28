import { apiClient } from "@/lib/api-client"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { userId, packageType, referralCode } = await request.json()

    if (!userId || !packageType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Update user profile with package information
    const packagePrices = {
      silver: 2950,
      gold: 5310,
      platinum: 8850,
    }

    const referredByProfile = referralCode
      ? await apiClient.get(`/profiles?referral_code=${referralCode}`)
      : null

    const { error: profileError } = await apiClient.patch(`/profiles/${userId}`, {
      package_type: packageType,
      package_price: packagePrices[packageType as keyof typeof packagePrices],
      referred_by: referredByProfile ? referredByProfile.data.id : null,
    })

    if (profileError) {
      console.error("Profile update error:", profileError)
      return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
    }

    // Create transaction record for package purchase
    await apiClient.post("/transactions", {
      user_id: userId,
      type: "package_purchase",
      amount: packagePrices[packageType as keyof typeof packagePrices],
      description: `${packageType.charAt(0).toUpperCase() + packageType.slice(1)} package purchase`,
      status: "completed",
    })

    // Process commissions if there's a referral code
    if (referralCode) {
      const commissionResponse = await fetch(`${request.nextUrl.origin}/api/commissions/calculate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newUserId: userId,
          packageType,
          referredBy: referralCode,
        }),
      })

      if (!commissionResponse.ok) {
        console.error("Commission processing failed")
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Signup processing error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}