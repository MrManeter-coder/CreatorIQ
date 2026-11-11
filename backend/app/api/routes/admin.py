from fastapi import APIRouter, Depends

from app.api.deps import require_roles
from app.models.user import User, UserRole

router = APIRouter(prefix="/admin", tags=["Admin"])


@router.get("/ping")
def admin_ping(
    current_user: User = Depends(
        require_roles(UserRole.ADMIN)
    ),
):
    return {
        "message": "Admin access granted",
        "admin": current_user.email,
    }