import Header from "../../components/Header";
import Sidebars from "../../components/Sidebars";
import AddStudents from "../../components/AddStudents";
import DeleteUser from "../../components/menu/DeleteUser";
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const classes = gql`
  query getClasses($where: ClassFilter) {
    classes(where: $where) {
      id
      type
      startedAt
      endedAt
      batch {
        id
        name
      }
      students {
        id
        firstName
        lastName
        email
        phoneNumber
      }
    }
  }
`;
export default function Detail() {
  const [showClass, setShowClass] = useState(false);
  const handleShowStudent = () => setShowClass(true);
  const [userId, setUserId] = useState("");
  const [showDeleteUser, setShowDeleteUser] = useState(false);

  const router = useRouter();
  const id = router.query.id;

  const { data, error, loading } = useQuery(classes, {
    variables: {
      where: {
        batch: {
          id,
        },
      },
    },
  });

  const [type, setType] = useState("");
  const {
    data: datas,
    err,
    load,
  } = useQuery(classes, {
    variables: {
      where: {
        batch: {
          id,
        },
        type,
      },
    },
  });

  const ClassID = datas?.classes[0]?.id;

  return (
    <>
      <Header />
      <Sidebars
        setShowClass={handleShowStudent}
        classes={classes}
        data={data}
        datas={datas}
        setType={setType}
        handleShowDeleteUser={setShowDeleteUser}
        setUserIdDelete={setUserId}
      />
      <AddStudents
        showClass={showClass}
        setShowClass={setShowClass}
        classes={classes}
        ClassID={ClassID}
        type={type}
        datas={datas}
      />
      <DeleteUser
        showDeleteUser={showDeleteUser}
        setShowDeleteUser={setShowDeleteUser}
        userId={userId}
      />
    </>
  );
}
