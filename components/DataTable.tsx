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
  disease?: string;
};

type PageProps = {
  searchTerm: string | undefined;
  url: string;
  type: string;
  action?: boolean;
};

export default function DataTable(props: PageProps) {
  const [sops, setSops] = useState<SOP[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [id, setId] = useState<string>();
  const [type, setType] = useState<string>();
  const [mode, setMode] = useState<string>();

  const modalHandler = (
    bool: boolean,
    type?: string,
    id?: string,
    mode?: string
  ) => {
    setShowModal(bool);
    setId(id);
    setType(type);
    setMode(mode);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          props.searchTerm
            ? `${props.url}/search?search=${props.searchTerm}`
            : `${props.url}`
        );
        const { data } = await res.json();
        setSops(data);
        toast.success("Data Successfully Fetched!!");
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        toast.error("oops! something went wrong");
      }
    };
    fetchData();
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

  if (props.type === "user") {
    tRow = (
      <tr>
        <th>No.</th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Created At:</th>
        {props.action ? <th>Action</th> : null}
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
        {props.action ? (
          <td>
            <div className="sop-actions">
              <EditAction id={sop._id} type={"user"} showModal={modalHandler} />
              <DeleteAction
                id={sop._id}
                type={"user"}
                showModal={modalHandler}
                mode={"delete"}
              />
            </div>
          </td>
        ) : null}
      </tr>
    ));
  }

  if (props.type === "sop") {
    tRow = (
      <tr>
        <th>No.</th>
        <th>Title</th>
        <th>Disease</th>
        <th>Description</th>
        <th>Updated At:</th>
        {props.action ? <th>Action</th> : null}
      </tr>
    );
    tDetails = sops.map((sop: SOP, indx: number) => (
      <tr key={sop._id}>
        <td>{indx + 1}.</td>
        <td>
          <Link href={sop.file} className="link-title" target="_blank">
            {sop.title}
          </Link>
        </td>
        <td>{sop.disease}</td>
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

        {props.action ? (
          <td>
            <div className="sop-actions">
              <EditAction id={sop._id} type={"sop"} showModal={modalHandler} />
              <DeleteAction
                id={sop._id}
                type={"sop"}
                showModal={modalHandler}
                mode={"delete"}
              />
            </div>
          </td>
        ) : null}
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
        {props.action ? <th>Action</th> : null}
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

        {props.action ? (
          <td>
            <div className="sop-actions">
              <EditAction />
              <DeleteAction />
            </div>
          </td>
        ) : null}
      </tr>
    ));
  }
  return (
    <>
      {showModal ? (
        <Modal
          id={id as string}
          type={type as string}
          mode={mode}
          showModal={modalHandler}
        />
      ) : isLoading ? (
        <Loader />
      ) : (
        <motion.table className="GeneratedTable">
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
