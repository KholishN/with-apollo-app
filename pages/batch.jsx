import Header from "../components/Header";
import { gql, useQuery } from "@apollo/client";
import TableBatch from "../components/TableBatch";
const batches = gql`
  {
    batches {
      name
      startedAt
      endedAt
    }
  }
`;

export default function Dashboard() {
  const { data, error, loading } = useQuery(batches);

  if (loading) return <p>Loading...</p>;
  return (
    <>
      <Header />
      <TableBatch />
    </>
  );
}
