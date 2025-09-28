from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def get_courses():
    return {"message": "Courses endpoint - to be implemented"}