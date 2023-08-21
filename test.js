function convertMuiV5Imports(text) {
  const importRegex = /^import\s+{\s*([^}]+)\s*}\s+from\s+'@mui\/material';/gm;
  return text.replace(importRegex, (match, p1) => {
    const imports = p1.split(",").map(s => s.trim());
    return imports
      .map(imp => `import ${imp} from '@mui/material/${imp}';`)
      .join("\n");
  });
}

const inputText = `import { useDispatch, useSelector } from "react-redux";
import GLModal from "../../../shared/GlowLEDsComponents/GLActiionModal/GLActiionModal";
import * as API from "../../../api";
import { closeLinkLabelModal, setSelectedShipmentId } from "../../../slices/shippingSlice";
import { FormControlLabel, Grid, Radio, RadioGroup, Typography, List, ListItem, ListItemText } from "@mui/material";
import LoadingInside from "../../../shared/SharedComponents/LoadingInside";`;

const outputText = convertMuiV5Imports(inputText);
console.log(outputText);

// const inputText = `
//   import { FormControlLabel, Grid, Radio, RadioGroup, Typography, List, ListItem, ListItemText } from "@mui/material"`;
// // Example usage
// const inputText = `
// import { useDispatch, useSelector } from "react-redux";
// import GLModal from "../../../shared/GlowLEDsComponents/GLActiionModal/GLActiionModal";
// import * as API from "../../../api";
// import { closeLinkLabelModal, setSelectedShipmentId } from "../../../slices/shippingSlice";
// import { FormControlLabel, Grid, Radio, RadioGroup, Typography, List, ListItem, ListItemText } from "@mui/material";
// import LoadingInside from "../../../shared/SharedComponents/LoadingInside";

//   const LinkLabelModal = () => {
//     const dispatch = useDispatch();
//     const orderPage = useSelector(state => state.orders.orderPage);
//     const { order } = orderPage;
//     const shipping = useSelector(state => state.shipping);
//     const { linkLabelModal, shipments, selectedShipmentId, loadingShipments } = shipping;

//     const selectedShipment = shipments?.find(shipment => shipment.id === selectedShipmentId);

//     return (
//       <div>
//         <GLModal
//           isOpen={linkLabelModal}
//           onConfirm={() => {
//             const selectedShipment = shipments.find(shipment => shipment.id === selectedShipmentId);
//             if (selectedShipment) {
//               dispatch(
//                 API.saveOrder({
//                   ...order,
//                   shipping: {
//                     ...order.shipping,
//                     shipment_id: selectedShipment.id,
//                     shipping_label: selectedShipment,
//                     tracking_url: selectedShipment.postage_label.label_url,
//                     shipment_tracker: selectedShipment.shipment_tracker,
//                     shipping_rate: selectedShipment.selected_rate,
//                   },
//                   tracking_number: selectedShipment.tracking_number,
//                 })
//               );
//             }
//           }}
//           onCancel={() => {
//             dispatch(closeLinkLabelModal());
//           }}
//           confirmDisabled={!selectedShipmentId}
//           title={"Link Label to Order"}
//           confirmLabel={"Save"}
//           confirmColor="primary"
//           cancelLabel={"Cancel"}
//           cancelColor="secondary"
//           disableEscapeKeyDown
//         >
//           <LoadingInside loading={loadingShipments} />
//           <Grid item xs={12}>
//             {!loadingShipments && (
//               <>
//                 <Typography variant="h6" gutterBottom component="div" className="mt-10px">
//                   Choose Shipment
//                 </Typography>
//                 <RadioGroup value={selectedShipmentId} onChange={e => dispatch(setSelectedShipmentId(e.target.value))}>
//                 </RadioGroup>
//                 {selectedShipment && (
//                   <div className="mt-10px">
//                     <Typography variant="h6" gutterBottom>
//                       Selected Shipment Details:
//                     </Typography>
//                     <List>
//                       <ListItem>
//                         <ListItemText
//                           primary={<strong>Name:</strong>}
//                           secondary={selectedShipment?.buyer_address.name || selectedShipment?.buyer_address.company}
//                         />
//                       </ListItem>
//                       <ListItem>
//                         <ListItemText primary={<strong>Shipment ID:</strong>} secondary={selectedShipment?.id} />
//                       </ListItem>
//                       <ListItem>
//                         <ListItemText
//                           primary={<strong>Tracking Number:</strong>}
//                           secondary={selectedShipment?.tracking_code}
//                         />
//                       </ListItem>
//                       <ListItem>
//                         <ListItemText primary={<strong>Tracker:</strong>} secondary={selectedShipment?.tracker.id} />
//                       </ListItem>
//                       <ListItem>
//                       </ListItem>{" "}
//                       <ListItem>
//                         <ListItemText
//                           primary={<strong>Service:</strong>}
//                           secondary={selectedShipment?.selected_rate.service}
//                         />
//                       </ListItem>
//                       <ListItem>
//                         <ListItemText
//                           primary={<strong>Tracking URL:</strong>}
//                           secondary={selectedShipment?.postage_label.label_url}
//                         />
//                       </ListItem>
//                     </List>
//                   </div>
//                 )}
//               </>
//             )}
//           </Grid>{" "}
//         </GLModal>
//       </div>
//     );
//   };

//   export default LinkLabelModal;`;
