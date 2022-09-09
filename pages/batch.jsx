import Header from "../components/Header";
import { gql, useQuery } from "@apollo/client";
import TableBatch from "../components/batches/TableBatch";
import CreateBatch from "../components/batches/CreateBatch";
import UpdateBatch from "../components/batches/UpdateBatch";
import DeleteBatch from "../components/batches/DeleteBatch";
import { useState } from "react";

const batches = gql`
  {
    batches {
      id
      name
      startedAt
      endedAt
    }
  }
`;

export default function Dashboard() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);

  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowUpdate(!showDelete);

  const [idBatch, setBatch] = useState(null);

  return (
    <>
      {/* <Header /> */}
      <TableBatch
        setShow={setShow}
        setShowUpdate={setShowUpdate}
        setShowDelete={setShowDelete}
        setBatch={setBatch}
        batches={batches}
      />
      <CreateBatch
        show={show}
        handleClose={handleClose}
        setShow={setShow}
        batches={batches}
      />
      <UpdateBatch
        show={showUpdate}
        handleClose={handleCloseUpdate}
        setShowUpdate={setShowUpdate}
        idBatch={idBatch}
      />
      <DeleteBatch
        showDelete={showDelete}
        handleCloseDelete={handleCloseDelete}
        setShow={setShowDelete}
        idBatch={idBatch}
        batches={batches}
      />
    </>
  );
}
