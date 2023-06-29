
import { Provider } from "react-redux";
import "./App.scss"
import ListToDo from "./Component/ListToDo";
import NewModal from "./Component/ModalAdd";
import store from "./Store";
import { useState } from "react";


function App() {
  const [filterStatus, setFilterStatus] = useState(null);
  return (
    <div>
      <Provider store={store}>
        <NewModal filterStatus={filterStatus} setFilterStatus={setFilterStatus}></NewModal>
        <ListToDo filterStatus={filterStatus}></ListToDo>
      </Provider>
    </div>
  );
}

export default App;
