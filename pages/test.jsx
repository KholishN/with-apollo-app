import { gql, useQuery } from "@apollo/client";

const user = gql`
  {
    users {
      id
      email
      firstName
    }
  }
`;

export default function test() {
  const { data, error, loading } = useQuery(user);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {error.message}</p>;
  // if (data) return <p>{data.users.email}</p>;
  return (
    <div>
      <p>div</p>

      <div>
        <p>{data.users[0].firstName}</p>
        {data?.users?.map((user) => (
          <h1 className="text-red-200">{user.firstName}</h1>
        ))}
      </div>
    </div>
  );
}
