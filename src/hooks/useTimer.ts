import { useState, useEffect } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

type params = {
  time: number;
  task_id: string;
  person_uid: string | undefined;
};

export const useTimer = ({ time, task_id, person_uid }: params): void => {
  const axiosPrivate = useAxiosPrivate();
};
