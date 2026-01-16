"""
SQLAlchemy Database Models
These models match the Prisma schema with PostgreSQL lowercase column names
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
    numImma = Column("numimma", String, unique=True, index=True, nullable=False)
    marque = Column(String, nullable=False)
    modele = Column(String, nullable=False)
    kilometrage = Column(Integer, nullable=False)
    etat = Column(Integer, default=0, nullable=False)  # 0: available, 1: rented
    prixLocation = Column("prixlocation", Float, nullable=False)
    createdAt = Column("createdat", DateTime, default=datetime.utcnow)
    updatedAt = Column("updatedat", DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationship
    rentals = relationship("Rental", back_populates="car")


class Renter(Base):
    """Renter model (Locataire)"""
    __tablename__ = "renters"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nom = Column(String, nullable=False)
    prenom = Column(String, nullable=False)
    adresse = Column(String, nullable=False)
    createdAt = Column("createdat", DateTime, default=datetime.utcnow)
    updatedAt = Column("updatedat", DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationship
    rentals = relationship("Rental", back_populates="renter")


class Rental(Base):
    """Rental model (Location)"""
    __tablename__ = "rentals"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    carId = Column("carid", Integer, ForeignKey("cars.id"), nullable=False)
    renterId = Column("renterid", Integer, ForeignKey("renters.id"), nullable=False)
    dateDebut = Column("datedebut", DateTime, default=datetime.utcnow)
    dateFin = Column("datefin", DateTime, nullable=True)
    kmDebut = Column("kmdebut", Integer, nullable=False)
    kmFin = Column("kmfin", Integer, nullable=True)
    montantTotal = Column("montanttotal", Float, nullable=True)
    createdAt = Column("createdat", DateTime, default=datetime.utcnow)
    updatedAt = Column("updatedat", DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    car = relationship("Car", back_populates="rentals")
    renter = relationship("Renter", back_populates="rentals")
