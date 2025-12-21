"""
SQLAlchemy Database Models
These models match the Prisma schema
"""
from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base


class Car(Base):
    """Car model (Voiture)"""
    __tablename__ = "cars"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    numImma = Column(String, unique=True, index=True, nullable=False)  # Registration number
    marque = Column(String, nullable=False)  # Brand
    modele = Column(String, nullable=False)  # Model
    kilometrage = Column(Integer, nullable=False)  # Mileage
    etat = Column(Integer, default=0, nullable=False)  # 0: available, 1: rented
    prixLocation = Column(Float, nullable=False)  # Rental price per day
    createdAt = Column(DateTime, nullable=False, default=datetime.now)
    updatedAt = Column(DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)
    
    # Relationships
    rentals = relationship("Rental", back_populates="car", cascade="all, delete-orphan")


class Renter(Base):
    """Renter model (Locataire)"""
    __tablename__ = "renters"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nom = Column(String, nullable=False)  # Last name
    prenom = Column(String, nullable=False)  # First name
    adresse = Column(String, nullable=False)  # Address
    createdAt = Column(DateTime, nullable=False, default=datetime.now)
    updatedAt = Column(DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)
    
    # Relationships
    rentals = relationship("Rental", back_populates="renter", cascade="all, delete-orphan")


class Rental(Base):
    """Rental model (Location)"""
    __tablename__ = "rentals"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    carId = Column(Integer, ForeignKey("cars.id", ondelete="CASCADE"), nullable=False)
    renterId = Column(Integer, ForeignKey("renters.id", ondelete="CASCADE"), nullable=False)
    dateDebut = Column(DateTime, nullable=False, default=datetime.now)
    dateFin = Column(DateTime, nullable=True)
    kmDebut = Column(Integer, nullable=False)  # Mileage at start
    kmFin = Column(Integer, nullable=True)  # Mileage at return (null if not returned)
    montantTotal = Column(Float, nullable=True)  # Total amount
    createdAt = Column(DateTime, nullable=False, default=datetime.now)
    updatedAt = Column(DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)
    
    # Relationships
    car = relationship("Car", back_populates="rentals")
    renter = relationship("Renter", back_populates="rentals")


