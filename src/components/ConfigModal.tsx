import { useEffect, useState, Dispatch, SetStateAction } from "react";
import Modal, { Styles } from "react-modal";
import { XIcon } from "@heroicons/react/outline";
import toast from "react-hot-toast";
import { task } from "../pages/MainDashboard";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

type Props = {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  tasks: task[];
  person_uid: string | undefined;
  changedData: number;
  setChangedData: Dispatch<SetStateAction<number>>;
};

Modal.setAppElement(document.getElementById("root") || "root");
const customStyles: Styles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1,
    width: "70%",
    height: "60%",
    maxHeight: "1000px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    border: "0",
    borderRadius: "25px",
    backgroundColor: "#3730a3",
    color: "#e0e7ff",
  },
};

type checkProps = {
  task: task;
  handleSelectionOfData: (e: any, task: task) => void;
  selectedData: task[];
};

function CheckBox({ task, handleSelectionOfData, selectedData }: checkProps) {
  const [checked, setChecked] = useState(false);
  const [full, setFull] = useState(false);

  useEffect(() => {
    if (selectedData.length === 3) {
      setFull(true);
    } else {
      setFull(false);
    }
  }, [selectedData]);

  return (
    <div key={task.key} className="inline-flex items-center mt-2 text-lg">
      <input
        type="checkbox"
        id={task.name}
        name="interest"
        value={task.name}
        className="cursor-pointer w-6 h-6 rounded"
        checked={checked}
        onChange={(e) => {
          handleSelectionOfData(e, task);
          setChecked(!checked);
        }}
        disabled={!checked && full}
      />
      <label className="ml-2" htmlFor="coding">
        {task.name}{" "}
      </label>
    </div>
  );
}

function ConfigModal({
  modalIsOpen,
  setModalIsOpen,
  tasks,
  person_uid,
  changedData,
  setChangedData,
}: Props) {
  const axiosPrivate = useAxiosPrivate();

  let initialSelectedData: task[] = [{ name: "no name", task_id: "", key: 0 }];

  const [selectedData, setSelectedData] = useState(initialSelectedData);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  //Set selected tasks on form

  const handleSelectionOfData = (e: any, task: task) => {
    if (selectedData.find((actualTask) => actualTask.key === task.key)) {
      let tempSelectedData: task[] = selectedData.filter((actualTask) => {
        return actualTask.key !== task.key;
      });
      setSelectedData(tempSelectedData);
    } else {
      let tempSelectedData: task[] = selectedData.filter(
        (actualTask) => actualTask.task_id !== ""
      );
      tempSelectedData.push(task);
      setSelectedData(tempSelectedData);
    }
  };

  // Send the PUT request

  const submitSelectedTasks = async (e: any) => {
    e.preventDefault();

    let finalArrayOfNames = [];

    selectedData.forEach((actualTask: task) => {
      finalArrayOfNames.push(actualTask.name);
    });

    if (finalArrayOfNames.length < 3) {
      for (let i = 0; i < 3; i++) {
        if (finalArrayOfNames[i] === undefined) {
          finalArrayOfNames[i] = null;
        }
      }
    }

    try {
      const response = await axiosPrivate.put(
        "/setSelectedTasks",
        JSON.stringify({
          person_uid: person_uid,
          task_id1: finalArrayOfNames[0],
          task_id2: finalArrayOfNames[1],
          task_id3: finalArrayOfNames[2],
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response.data);
      setSelectedData([]);
      setChangedData(changedData + 1);
      closeModal();
      toast.success("Tasks updated correctly!");
    } catch (error) {
      console.log(error);
      toast.error("Something go wrong, try it latter.");
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Select Tasks Modal"
    >
      <div className="flex flex-col h-full gap-8 ">
        <div className="flex flex-row justify-between justify-self-start">
          <h2 className="font-semibold text-lg">Select your main taks</h2>
          <button onClick={closeModal}>
            <XIcon className="w-6 h-6 xl:h-8 xl:w-8 font-semibold text-lg" />
          </button>
        </div>

        <form
          onSubmit={(e) => submitSelectedTasks(e)}
          className="w-2/3 h-full flex flex-col gap-3 m-auto "
        >
          <div className=" max-h-80 overflow-y-scroll flex flex-col gap-2">
            {tasks.map((task) => {
              return (
                <CheckBox
                  key={task.key}
                  task={task}
                  handleSelectionOfData={handleSelectionOfData}
                  selectedData={selectedData}
                />
              );
            })}
          </div>
          <button
            className="text-white lg:px-24 py-2 mt-11 bg-indigo-500 rounded-lg cursor-pointer hover:bg-indigo-600 transition-all"
            type="submit"
          >
            Select Tasks
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default ConfigModal;
