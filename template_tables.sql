-- DROPS

DROP TABLE JPop;
DROP TABLE Drama;
DROP TABLE Games;
DROP TABLE Vocaloid;
DROP TABLE Doujin;
DROP TABLE Animation;
DROP TABLE Anime;
DROP TABLE OST;

-- TABLES

CREATE TABLE "JPop" (
    "Id" INTEGER,
    "Address" TEXT,
    "Status" TEXT,
    "Artist" TEXT,
    "Title" TEXT,
    "Album" TEXT,
    PRIMARY KEY("Id")
);

CREATE TABLE "Drama" (
    "Id" INTEGER,
    "Address" TEXT,
    "Status" TEXT,
    "Artist" TEXT,
    "Title" TEXT,
    "Album" TEXT,
    "Drama" TEXT,
    PRIMARY KEY("Id")
);

CREATE TABLE "Games" (
    "Id" INTEGER,
    "Address" TEXT,
    "Status" TEXT,
    "Artist" TEXT,
    "Title" TEXT,
    "Album" TEXT,
    "Game" TEXT,
    PRIMARY KEY("Id")
);

CREATE TABLE "Vocaloid" (
    "Id" INTEGER,
    "Address" TEXT,
    "Status" TEXT,
    "Artist" TEXT,
    "Title" TEXT,
    "Album" TEXT,
    PRIMARY KEY("Id")
);

CREATE TABLE "Doujin" (
    "Id" INTEGER,
    "Address" TEXT,
    "Status" TEXT,
    "Artist" TEXT,
    "Title" TEXT,
    "Album" TEXT,
    PRIMARY KEY("Id")
);

CREATE TABLE "Animation" (
    "Id" INTEGER,
    "Address" TEXT,
    "Status" TEXT,
    "Artist" TEXT,
    "Title" TEXT,
    "Album" TEXT,
    "Animation" TEXT,
    PRIMARY KEY("Id")
);

CREATE TABLE "Anime" (
    "Id" INTEGER,
    "Address" TEXT,
    "Status" TEXT,
    "Artist" TEXT,
    "Title" TEXT,
    "Album" TEXT,
    "Anime" TEXT,
	"Format" TEXT,
	"Type" TEXT,
	"Media" TEXT,
	"Composer" TEXT,
    PRIMARY KEY("Id")
);

CREATE TABLE "OST" (
    "Id" INTEGER,
    "Address" TEXT,
    "Status" TEXT,
    "Artist" TEXT,
    "Title" TEXT,
    "Album" TEXT,
    "Anime" TEXT,	
	"Media" TEXT,
	"Composer" TEXT,
    PRIMARY KEY("Id")
);

CREATE TABLE "Anime" (
	"Id" INTEGER,
	"Address" TEXT,
	"Status" TEXT,
	"Artist" TEXT,
	"Title" TEXT,
	"Album" TEXT,
	"Anime" TEXT,
	"Format" TEXT,
	"Type" TEXT,
	"Media" TEXT,
	"Composer" TEXT,
	PRIMARY KEY("Id")
);