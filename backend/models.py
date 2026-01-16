"""
SQLAlchemy Database Models
These models match the Prisma schema exactly (camelCase columns)
"""
from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

try:
    from .database import Base
except ImportError:
    from database import Base


class Car(Base):
    """Car model (Voiture)"""
    __tablename__ = "cars"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    numImma = Column(String, unique=True, index=True, nullable=False)
    marque = Column(String, nullable=False)
    modele = Column(String, nullable=False)
    kilometrage = Column(Integer, nullable=False)
    etat = Column(Integer, default=0, nullable=False)  # 0: available, 1: rented
    prixLocation = Column(Float, nullable=False)
    createdAt = Column(DateTime, default=datetime.utcnow)
    updatedAt = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationship
    rentals = relationship("Rental", back_populates="car")


class Renter(Base):
    """Renter model (Locataire)"""
    __tablename__ = "renters"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nom = Column(String, nullable=False)
    prenom = Column(String, nullable=False)
    adresse = Column(String, nullable=False)
    createdAt = Column(DateTime, default=datetime.utcnow)
    updatedAt = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationship
    rentals = relationship("Rental", back_populates="renter")


class Rental(Base):
    """Rental model (Location)"""
    __tablename__ = "rentals"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    carId = Column(Integer, ForeignKey("cars.id"), nullable=False)
    renterId = Column(Integer, ForeignKey("renters.id"), nullable=False)
    dateDebut = Column(DateTime, default=datetime.utcnow)
    dateFin = Column(DateTime, nullable=True)
    kmDebut = Column(Integer, nullable=False)
    kmFin = Column(Integer, nullable=True)
    montantTotal = Column(Float, nullable=True)
    createdAt = Column(DateTime, default=datetime.utcnow)
    updatedAt = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    car = relationship("Car", back_populates="rentals")
    renter = relationship("Renter", back_populates="rentals")
