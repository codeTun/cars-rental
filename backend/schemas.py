"""
Pydantic Schemas for Request/Response Validation
"""
from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime
from typing import Optional


# ============== Car Schemas ==============

class CarBase(BaseModel):
    """Base schema for Car"""
    numImma: str = Field(..., description="Registration number")
    marque: str = Field(..., description="Brand")
    modele: str = Field(..., description="Model")
    kilometrage: int = Field(..., ge=0, description="Mileage (must be >= 0)")
    etat: int = Field(default=0, ge=0, le=1, description="State: 0=available, 1=rented")
    prixLocation: float = Field(..., gt=0, description="Rental price per day (must be > 0)")


class CarCreate(CarBase):
    """Schema for creating a new car"""
    pass


class CarUpdate(BaseModel):
    """Schema for updating a car (all fields optional)"""
    numImma: Optional[str] = None
    marque: Optional[str] = None
    modele: Optional[str] = None
    kilometrage: Optional[int] = Field(None, ge=0)
    etat: Optional[int] = Field(None, ge=0, le=1)
    prixLocation: Optional[float] = Field(None, gt=0)


class CarResponse(CarBase):
    """Schema for car response"""
    id: int
    createdAt: str  # ISO format string
    updatedAt: str  # ISO format string
    
    model_config = ConfigDict(from_attributes=True)


# ============== Renter Schemas ==============

class RenterBase(BaseModel):
    """Base schema for Renter"""
    nom: str = Field(..., min_length=1, description="Last name")
    prenom: str = Field(..., min_length=1, description="First name")
    adresse: str = Field(..., min_length=1, description="Address")


class RenterCreate(RenterBase):
    """Schema for creating a new renter"""
    pass


class RenterUpdate(BaseModel):
    """Schema for updating a renter (all fields optional)"""
    nom: Optional[str] = Field(None, min_length=1)
    prenom: Optional[str] = Field(None, min_length=1)
    adresse: Optional[str] = Field(None, min_length=1)


class RenterResponse(RenterBase):
    """Schema for renter response"""
    id: int
    createdAt: str  # ISO format string
    updatedAt: str  # ISO format string
    
    model_config = ConfigDict(from_attributes=True)


# ============== Rental Schemas ==============

class RentalBase(BaseModel):
    """Base schema for Rental"""
    carId: int = Field(..., gt=0, description="Car ID")
    renterId: int = Field(..., gt=0, description="Renter ID")
    kmDebut: int = Field(..., ge=0, description="Starting mileage")


class RentalCreate(RentalBase):
    """Schema for creating a new rental"""
    dateDebut: Optional[str] = None  # ISO format string


class RentalUpdate(BaseModel):
    """Schema for updating a rental (for returning a car)"""
    dateFin: Optional[str] = None  # ISO format string
    kmFin: Optional[int] = Field(None, ge=0)
    montantTotal: Optional[float] = Field(None, ge=0)


class RentalResponse(RentalBase):
    """Schema for rental response"""
    id: int
    dateDebut: str  # ISO format string
    dateFin: Optional[str] = None  # ISO format string
    kmFin: Optional[int] = None
    montantTotal: Optional[float] = None
    createdAt: str  # ISO format string
    updatedAt: str  # ISO format string
    
    model_config = ConfigDict(from_attributes=True)


class RentalWithDetails(RentalResponse):
    """Schema for rental response with car and renter details"""
    car: CarResponse
    renter: RenterResponse
    
    model_config = ConfigDict(from_attributes=True)


# ============== Generic Response Schemas ==============

class MessageResponse(BaseModel):
    """Generic message response"""
    message: str


class ErrorResponse(BaseModel):
    """Error response"""
    detail: str


