"use client";

//@ts-nocheck

import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import "../styles/DataTable.css";
import { EditAction } from "../components";
import DeleteAction from "./DeleteActionButton";
import Link from "next/link";
import { motion } from "framer-motion";
import Loader from "./Loader";
import toast from "react-hot-toast";
import Modal from "./Modal";

type SOP = {
  _id: string;
  file?: string | undefined;
  title?: string;
  program?: string;
  description?: string;
  created_at?: string | number | Date | undefined;
  fname?: string;
  lname?: string;
  email?: string;
  role?: string;
  createdAt?: string;
  name?: string;
};

type PageProps = {
  searchTerm: string | undefined;
  url: string;
  type: string;
};

export default function DataTable(props: PageProps) {
  const [sops, setSops] = useState<SOP[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [id, setId] = useState<string>();
  const [type, setType] = useState<string>();

  const modalHandler = (bool: boolean, type?: string, id?: string) => {
    setShowModal(bool);
    setId(id);
    setType(type);
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log(props.searchTerm);
      try {
        setIsLoading(true);
        const res = await fetch(
          props.searchTerm
            ? `${props.url}/search?search=${props.searchTerm}`
            : `${props.url}`
        );
        const { data } = await res.json();
        setSops(data);
        toast.success("successfully checked");
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        toast.error("oops! something went wrong");
      }
    };
    fetchData();
    console.log(sops);
  }, [props.searchTerm]);

  // const debouncedSearch = debounce((searchTerm: string) => {
  //   setDebouncedSearchTerm(searchTerm);
  // }, 500);

  // const handleSearchTermChange = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const searchTerm = event.target.value;
  //   debouncedSearch(searchTerm);
  // };

  let tRow, tDetails;

  console.log("TYPE", props.type);

  if (props.type === "user") {
    tRow = (
      <tr>
        <th>No.</th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Created At:</th>
        <th>Action</th>
      </tr>
    );

    tDetails = sops.map((sop: SOP, indx: number) => (
      <tr key={sop._id}>
        <td>{indx + 1}.</td>
        <td>
          <Link href={"#"} className="link-title">
            {`${sop.fname} ${sop.lname}`}
          </Link>
        </td>
        <td>{sop.email}</td>
        <td>
          <div className="sop-desc">{sop.role}</div>
        </td>
        <td>
          {new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric",
            //@ts-ignore
          }).format(new Date(sop.createdAt))}
        </td>
        <td>
          <div className="sop-actions">
            <EditAction id={sop._id} type={"user"} showModal={modalHandler} />
            <DeleteAction />
          </div>
        </td>
      </tr>
    ));
  }

  if (props.type === "sop") {
    tRow = (
      <tr>
        <th>No.</th>
        <th>Title</th>
        <th>Program</th>
        <th>Description</th>
        <th>Updated At:</th>
        <th>Action</th>
      </tr>
    );
    tDetails = sops.map((sop: SOP, indx: number) => (
      <tr key={sop._id}>
        <td>{indx + 1}.</td>
        <td>
          <Link href={sop.file} className="link-title">
            {sop.title}
          </Link>
        </td>
        <td>{sop.program}</td>
        <td>
          <div className="sop-desc">{sop.description}</div>
        </td>
        <td>
          {new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric",
            //@ts-ignore
          }).format(new Date(sop.createdAt))}
        </td>
        <td>
          <div className="sop-actions">
            <EditAction id={sop._id} type={"sop"} showModal={modalHandler} />
            <DeleteAction />
          </div>
        </td>
      </tr>
    ));
  }

  //DISEASE
  if (props.type === "disease") {
    tRow = (
      <tr>
        <th>No.</th>
        <th>Name</th>
        <th>Description</th>
        <th>Action</th>
      </tr>
    );
    tDetails = sops.map((sop: SOP, indx: number) => (
      <tr key={sop._id}>
        <td>{indx + 1}.</td>
        <td>
          <Link href={"#"} className="link-title">
            {sop.name}
          </Link>
        </td>
        <td>
          <div className="sop-desc">{sop.description}</div>
        </td>
        <td>
          <div className="sop-actions">
            <EditAction />
            <DeleteAction />
          </div>
        </td>
      </tr>
    ));
  }
  return (
    <>
      {showModal ? (
        <Modal
          id={id as string}
          type={type as string}
          showModal={modalHandler}
        />
      ) : isLoading ? (
        <Loader />
      ) : (
        <motion.table className="GeneratedTable" id={props.type}>
          <thead>{tRow}</thead>
          <tbody>
            {/*TODO:NOTIFICATIONS AND SPINNERS AS WELL AS NO-SOP FOUND*/}
            {tDetails}
          </tbody>
        </motion.table>
      )}
    </>
  );
}
