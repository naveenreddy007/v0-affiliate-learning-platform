from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def get_payments():
    return {"message": "Payments endpoint - to be implemented"}