import React, { useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { addMember } from "../../../_redux/actions/member";
const AddMember = (props) => {
  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm();
  const [selectedOption, setSelectedOption] = useState();

  const newLabelValuesFromMemberTypesArray = props.membertypes?.map(
    (memberType) => ({
      value: memberType.id,
      label: memberType.MemberTypeCode,
    })
  );

  //console.log(newLabelValuesFromMemberTypesArray);

  const onChangeSelect = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  const onSubmit = (values) => {
    if (selectedOption) {
      const addValues = { ...values, MemberTypeId: selectedOption.value };
      dispatch(addMember(addValues));
      props.onHide();
    }
  };
  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Insérer un adhérent
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <Row>
              <Col>
                <Form onSubmit={handleSubmit(onSubmit)} id="memberForm">
                  <Form.Group controlId="AddMembershipCode">
                    <Form.Label>Code Adhérent</Form.Label>
                    <Form.Control
                      type="text"
                      name="MembershipCode"
                      ref={register({
                        required: true,
                        pattern: /[0-9]{3}/,
                        maxLength: 3,
                      })}
                      className={`form-control ${
                        errors.MembershipCode ? "is-invalid" : ""
                      }`}
                      placeholder="Code Adhérent"
                    />
                    {errors.MembershipCode && (
                      <small className="text-danger">Code incorrect</small>
                    )}
                  </Form.Group>
                  <Form.Group controlId="AddMemberName">
                    <Form.Label>Nom Adhérent</Form.Label>
                    <Form.Control
                      type="text"
                      name="MemberName"
                      ref={register({ required: false })}
                      placeholder="Nom Adhérent"
                    />
                  </Form.Group>
                  <Form.Group controlId="AddMemberType">
                    <Form.Label>Type Adhérent</Form.Label>
                    <Select
                      value={selectedOption}
                      onChange={onChangeSelect}
                      options={newLabelValuesFromMemberTypesArray}
                      placeholder="Choisissez un type d'adhérent"
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.onHide}>
            Fermer
          </Button>
          <Button variant="primary" type="submit" form="memberForm">
            Insérer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddMember;
