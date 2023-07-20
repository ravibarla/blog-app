import { useEffect, useState } from "react";

const InputForm = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  useEffect(() => {
    document.title = fname + " " + lname;
  }, [fname, lname]);
  return (
    <>
      <form>
        <input
          placeholder="first name"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
        />
        <input
          placeholder="last name"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
        />
        <label>hello {fname + lname}</label>
      </form>
    </>
  );
};

export default InputForm;
