import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { URL } from "@/utils/constants";
import Loader from "./Loader";
import "../styles/AdminOverview.css";

type PageProps = {
  icon: any;
  url: string;
  title: string;
};

//TODO:ADD PROP FOR REDUCING LOADER SIZES//

const Overview = (props: PageProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [length, setLength] = useState<number>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${URL}/${props.url}`);

        const data = await res.json();
        setLength(data.items);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [props.url]);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="overview"
      key={props.url}
    >
      <div className="icon-container">{props.icon}</div>
      <div className="overview-title">{props.title}</div>
      <div className="overview-total">{isLoading ? <Loader /> : length}</div>
    </motion.div>
  );
};

export default Overview;
