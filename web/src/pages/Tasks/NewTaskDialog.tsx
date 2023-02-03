import { Dialog } from "../../components/Dialog";

export const NewTaskDialog: React.FC = () => {
  return (
    <Dialog title="New Task" onClose={() => console.log("close")}>
      Dialog
    </Dialog>
  );
};
