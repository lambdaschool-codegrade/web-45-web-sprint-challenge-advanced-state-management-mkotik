import axios from "axios";

export const FETCH_START = "FETCH_START";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_FAIL = "FETCH_FAIL";
export const ADD_SMURF = "ADD_SMURF";
export const ADD_ERROR_MSG = "ADD_ERROR_MSG";

export const fetchSmurfs = () => {
  return (dispatch) => {
    dispatch(fetchStart());
    axios
      .get("http://localhost:3333/smurfs")
      .then((res) => {
        dispatch(fetchSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchFail(err.message));
      });
  };
};

export const fetchStart = () => {
  return { type: FETCH_START };
};

export const fetchSuccess = (value) => {
  return { type: FETCH_SUCCESS, payload: value };
};

export const fetchFail = (value) => {
  return { type: FETCH_FAIL, payload: value };
};

export const addSmurf = (value) => {
  return { type: ADD_SMURF, payload: { ...value, id: randIdGen() } };
};

export const addErrorMsg = (value) => {
  return { type: ADD_ERROR_MSG, payload: value };
};

const randNumGen = function (min, max) {
  const num = Math.floor(Math.random() * (max + 1 - min)) + min;
  return num;
};

const randIdGen = function () {
  const lowerCaseCharacters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const upperCaseCharacters = lowerCaseCharacters.map((cur) =>
    cur.toUpperCase()
  );
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const allCharacters = lowerCaseCharacters.concat(
    upperCaseCharacters,
    numbers
  );
  const id = [];

  for (let i = 0; i < 36; i++) {
    id.push(allCharacters[randNumGen(0, 61)]);
  }

  return id.join("");
};

//Task List:
//1. Add a thunk action called fetchSmurfs that triggers a loading status display in our application, performs an axios call to retreive smurfs from our server, saves the result of that call to our state and shows an error if one is made.
//2. Add a standard action that allows us to add new smurf (including the name, nickname, position, summary)
//3. Add a standard action that allows us to set the value of the error message slice of state.
