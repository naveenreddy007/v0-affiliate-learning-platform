import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

// Commission rates based on package combinations
const COMMISSION_RATES = {
  silver: {
    silver: { direct: 1000, indirect: 300 },
    gold: { direct: 1500, indirect: 450 },
    platinum: { direct: 2000, indirect: 600 },
  },
  gold: {
    silver: { direct: 1200, indirect: 360 },
    gold: { direct: 2250, indirect: 675 },
    platinum: { direct: 3000, indirect: 900 },
  },
  platinum: {
    silver: { direct: 1500, indirect: 450 },
    gold: { direct: 3375, indirect: 1012.5 },
    platinum: { direct: 5625, indirect: 1000 },
  },
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { newUserId, packageType, referredBy } = await request.json()

    if (!newUserId || !packageType || !referredBy) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get referrer's profile
    const { data: referrer } = await supabase.from("profiles").select("*").eq("referral_code", referredBy).single()

    if (!referrer) {
      return NextResponse.json({ error: "Invalid referral code" }, { status: 400 })
    }

    const referrerPackage = referrer.package_type
    if (!referrerPackage || !COMMISSION_RATES[referrerPackage as keyof typeof COMMISSION_RATES]) {
      return NextResponse.json({ error: "Referrer package not found" }, { status: 400 })
    }

    const rates =
      COMMISSION_RATES[referrerPackage as keyof typeof COMMISSION_RATES][
        packageType as keyof typeof COMMISSION_RATES.silver
      ]

    // Create direct commission for referrer
    const { error: directCommissionError } = await supabase.from("commissions").insert({
      from_user_id: newUserId,
      to_user_id: referrer.id,
      commission_type: "direct",
      amount: rates.direct,
      package_type: packageType,
      status: "pending",
    })

    if (directCommissionError) {
      console.error("Direct commission error:", directCommissionError)
      return NextResponse.json({ error: "Failed to create direct commission" }, { status: 500 })
    }

    // Create transaction record for direct commission
    await supabase.from("transactions").insert({
      user_id: referrer.id,
      type: "commission_earned",
      amount: rates.direct,
      description: `Direct referral commission from ${packageType} package purchase`,
      status: "completed",
    })

    // Check if referrer was also referred (for indirect commission)
    if (referrer.referred_by) {
      const { data: indirectReferrer } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", referrer.referred_by)
        .single()

      if (indirectReferrer && indirectReferrer.package_type) {
        // Create indirect commission
        const { error: indirectCommissionError } = await supabase.from("commissions").insert({
          from_user_id: newUserId,
          to_user_id: indirectReferrer.id,
          commission_type: "indirect",
          amount: rates.indirect,
          package_type: packageType,
          status: "pending",
        })

        if (!indirectCommissionError) {
          // Create transaction record for indirect commission
          await supabase.from("transactions").insert({
            user_id: indirectReferrer.id,
            type: "commission_earned",
            amount: rates.indirect,
            description: `Indirect referral commission from ${packageType} package purchase`,
            status: "completed",
          })
        }
      }
    }

    // Update referrer's total earnings
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        total_earnings: referrer.total_earnings + rates.direct,
        available_balance: referrer.available_balance + rates.direct,
      })
      .eq("id", referrer.id)

    if (updateError) {
      console.error("Update referrer earnings error:", updateError)
    }

    // Update indirect referrer's earnings if applicable
    if (referrer.referred_by) {
      const { data: indirectReferrer } = await supabase
        .from("profiles")
        .select("total_earnings, available_balance")
        .eq("id", referrer.referred_by)
        .single()

      if (indirectReferrer) {
        await supabase
          .from("profiles")
          .update({
            total_earnings: indirectReferrer.total_earnings + rates.indirect,
            available_balance: indirectReferrer.available_balance + rates.indirect,
          })
          .eq("id", referrer.referred_by)
      }
    }

    return NextResponse.json({
      success: true,
      directCommission: rates.direct,
      indirectCommission: rates.indirect,
    })
  } catch (error) {
    console.error("Commission calculation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
