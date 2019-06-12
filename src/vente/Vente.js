import React, { Component } from 'react';
import load from "../reporting/img/load.svg";
import axios from 'axios';
import { Row, Col, Card, Table, Button, Badge, Modal, ModalBody, CustomInput, ModalHeader, Input, FormGroup, ModalFooter} from 'reactstrap';
import './Vente.css';
import Validators from "../validators/validators";





class Vente extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ventes : "",
        }

        };


componentDidMount() {

    }

    handleselectedFile = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }

  handleUpload = () => {
    document.getElementById("Loader").style.display = "block";
      const formData = new FormData();
      formData.append('file',this.state.selectedFile)

      axios.post(process.env.REACT_APP_API_URL+'/ventes/load',formData,
        {
            headers : {
                'Content-Type': 'multipart/form-data'

            }
        }

                ).then(res => {
                    document.getElementById("Loader").style.display = "none";
                    console.log(res)
                    this.setState({ventes : res.data.ventesNouvellesTotal});

                 //   if (this.state.ventes.length !=0 ){


                     //   this.showVentes();
                 //   }
    



      })
      .catch((r) => {
          document.getElementById("Loader").style.display = "none";
          alert("Fichier non valide")});

  }
  showTableColumn(){
    let table = []
      if (this.state.ventes.lenght !=0 ) {
          if (Validators.isDefined(this.state.ventesNouvellesTotal)) {
              table.push(
                  <tr>
                      <th>Date de vente</th>
                      <th>Produit</th>
                      <th>Lieu de vie</th>
                      <th>Vendu par</th>
                      <th>acheté par</th>
                      <th>total</th>
                  </tr>);
          }
      }
      return table;

}

/*

  showVentes() {

        let table = []

        if (Validators.isDefined(this.state.ventes)) {
            for (let i=0; i < Object.keys(this.state.ventes).length; i++) {
                let vente = this.state.ventes[i];
                table.push(
                    <tr>
                        <td> {vente.dateVente} </td>
                        <td> {vente.produit} </td>
                        <td> {vente.lieuDeVie} </td>
                        <td> {vente.selledBy} </td>
                        <td> {vente.purchaseBy} </td>
                        <td> {vente.amount} </td>

                    </tr>);

                    <Table className="Table">
                            <thead>
                             {this.showTableColumn()}
                            </thead>
                            <tbody>

                              {this.showVentes()}

                            </tbody>
                        </Table>

            } 
            return table
        }
        
}
*/

    // ----------------------- VUE HTML -----------------------------

    render() {
        return (
            <div>
                <div id="Loader" class="Loader">
                    <img src={load} class="LoaderImg"/>
                </div>  
                <Input type="file" name="" id="" onChange={this.handleselectedFile} />
                <Button type="success" onClick={this.handleUpload}>Upload</Button>
                <div> {Math.round(this.state.loaded,2) } %</div>

                <Row>
                    <Col>
                        
                            {(this.state.ventes == 0) ? "Aucune vente n'a été ajoutée !" : this.state.ventes+"ont été ajoutées dans la base de données !"}
                        
                    </Col>
                </Row>

            </div>


        )
    }

}

export default Vente;