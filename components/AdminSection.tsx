"use client";

import React, { Suspense, useState } from "react";

import "../styles/MainSection.css";

import {
  SearchForm,
  Sidebar,
  AdminButtonGroup,
  DataTable,
  PageNumbers,
  AdminOverview,
  NewSop,
  DataContainer,
} from "../components/index";
import Loader from "./Loader";
import { Toaster } from "react-hot-toast";

type PageProps = {
  sop: any;
};

const AdminSection = (props: PageProps) => {
  return (
    <>
      <Toaster containerClassName="toast" />

      <section className="main-section admin">
        <AdminOverview />
        {/*SOP*/}
        <h1 className="admin-title" id="sop">
          SOP's
        </h1>
        <Suspense fallback={<Loader />}>
          <DataContainer show={"sop"} type="sop" action={true} />
        </Suspense>

        {/*USERS*/}
        <h1 className="admin-title" id="user">
          User's
        </h1>
        <Suspense fallback={<Loader />}>
          <DataContainer type="user" action={true} />
        </Suspense>

        {/*DISEASES*/}
        <h1 className="admin-title" id="disease">
          Infectious Diseases
        </h1>
        <Suspense fallback={<Loader />}>
          <DataContainer show="disease" type="disease" />
        </Suspense>
      </section>
    </>
  );
};

export default AdminSection;
