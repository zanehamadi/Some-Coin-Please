import { Button } from "@mui/material";
import { useState } from "react";
import {outlinedButton} from '../styling-variables'
import { Modal } from '../../context/Modal';
import EditForm from "./EditForm";

interface EditProductProps{
  product?:any;
}
function EditProduct({product}:EditProductProps){

  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <Button variant="outlined" style={outlinedButton} onClick={() => setShowModal(true)}>Edit Product</Button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditForm product={product}/>
        </Modal>
      )}
    </>
  );
}

export default EditProduct