--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

-- Started on 2023-05-08 00:05:36

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE tw;
--
-- TOC entry 3363 (class 1262 OID 40975)
-- Name: tw; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE tw WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Romanian_Romania.1252';


ALTER DATABASE tw OWNER TO postgres;

\connect tw

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 40981)
-- Name: child; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.child (
    id character varying(64) NOT NULL,
    "familyId" character varying(64) NOT NULL,
    "firstName" character varying(16) NOT NULL,
    "lastName" character varying(16) NOT NULL,
    "dateOfBirth" character varying(16) NOT NULL,
    gender character varying(16),
    nationality character varying(16),
    weight real,
    height real
);


ALTER TABLE public.child OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 41001)
-- Name: feeding_calendar; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.feeding_calendar (
    "childId" character varying(64) NOT NULL,
    date_time character varying(16) NOT NULL,
    note text NOT NULL,
    id character varying(64) NOT NULL
);


ALTER TABLE public.feeding_calendar OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 41034)
-- Name: friend; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.friend (
    id character varying(64) NOT NULL,
    "childId" character varying(64) NOT NULL,
    "firstName" character varying(32) NOT NULL,
    "lastName" character varying(32) NOT NULL,
    "dateOfBirth" character varying(16),
    "parentName" character varying(32),
    "parentContact" character varying(64),
    "howTheyMet" text,
    relationship character varying(16) NOT NULL
);


ALTER TABLE public.friend OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 41041)
-- Name: friend_interaction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.friend_interaction (
    id character varying(64) NOT NULL,
    "friendId" character varying(64) NOT NULL,
    date character varying(16) NOT NULL,
    title character varying(32) NOT NULL,
    note text
);


ALTER TABLE public.friend_interaction OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 41027)
-- Name: medical_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.medical_history (
    id character varying(64) NOT NULL,
    "childId" character varying(64) NOT NULL,
    date character varying(16) NOT NULL,
    title character varying(32) NOT NULL,
    severity character varying(16) NOT NULL,
    note text
);


ALTER TABLE public.medical_history OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 40996)
-- Name: multimedia_resource; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.multimedia_resource (
    "childId" character varying(64) NOT NULL,
    date character varying(16) NOT NULL,
    note text NOT NULL,
    path character varying NOT NULL,
    id character varying(64) NOT NULL
);


ALTER TABLE public.multimedia_resource OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 41016)
-- Name: sleeping_calendar; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sleeping_calendar (
    "childId" character varying(64) NOT NULL,
    date_time character varying(16) NOT NULL,
    "sleepType" character varying(16) NOT NULL,
    note text,
    id character varying(64) NOT NULL
);


ALTER TABLE public.sleeping_calendar OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 40976)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id character varying(64) NOT NULL,
    email character varying(64) NOT NULL,
    password character varying(128) NOT NULL,
    "firstName" character varying(32) NOT NULL,
    "lastName" character varying(32) NOT NULL,
    "dateOfBirth" character varying(16) NOT NULL,
    gender character varying(16),
    nationality character varying(16),
    "familyId" character varying(64) NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 3203 (class 2606 OID 40985)
-- Name: child child_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.child
    ADD CONSTRAINT child_pkey PRIMARY KEY (id);


--
-- TOC entry 3207 (class 2606 OID 41024)
-- Name: feeding_calendar eating_calendar_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feeding_calendar
    ADD CONSTRAINT eating_calendar_pkey PRIMARY KEY (id);


--
-- TOC entry 3215 (class 2606 OID 41047)
-- Name: friend_interaction friend_interaction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.friend_interaction
    ADD CONSTRAINT friend_interaction_pkey PRIMARY KEY (id);


--
-- TOC entry 3213 (class 2606 OID 41040)
-- Name: friend friend_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.friend
    ADD CONSTRAINT friend_pkey PRIMARY KEY (id);


--
-- TOC entry 3211 (class 2606 OID 41033)
-- Name: medical_history medical_history_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medical_history
    ADD CONSTRAINT medical_history_pkey PRIMARY KEY (id);


--
-- TOC entry 3205 (class 2606 OID 41022)
-- Name: multimedia_resource multimedia_resource_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.multimedia_resource
    ADD CONSTRAINT multimedia_resource_pkey PRIMARY KEY (id);


--
-- TOC entry 3209 (class 2606 OID 41026)
-- Name: sleeping_calendar sleeping_calendar_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sleeping_calendar
    ADD CONSTRAINT sleeping_calendar_pkey PRIMARY KEY (id);


--
-- TOC entry 3201 (class 2606 OID 40980)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id, email);


-- Completed on 2023-05-08 00:05:36

--
-- PostgreSQL database dump complete
--

