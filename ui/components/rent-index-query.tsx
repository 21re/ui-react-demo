import * as React from "react";
import { Form, Col, FormGroup, Label, Input, Row, Button, Card, CardBody, CardTitle, ListGroupItem, ListGroup, Alert } from "reactstrap";
import { State } from "../reducers/state";
import { BoundActions, actionBinder } from "../actions/bindable";
import { connect } from "react-redux";
import { RentIndexListItem, QuestionCatalog, Question, QuestionCatalogRequest, Address } from "../models/rentindex";
import { bind } from "decko";
import { isBoolean, isString } from "util";

const mapStateToProps = (state: State) => ({
  rentIndexList: state.rentIndexState.rentIndexList,
  rentIndex: state.rentIndexState.rentIndex,
  loading: state.rentIndexState.loading,
  error: state.rentIndexState.error,
  result: state.rentIndexState.result,
});

type RentIndexProps = ReturnType<typeof mapStateToProps> & BoundActions;

interface RentIndexState {
  city: RentIndexListItem | null
  selectedYear: number | null
  rentIndexRequest: QuestionCatalogRequest
}

export class RentIndexImpl extends React.Component<RentIndexProps, RentIndexState> {
  constructor(props: RentIndexProps) {
    super(props);
    this.state = {
      city: null,
      selectedYear: null,
      rentIndexRequest: {
        yearOfConstruction: 2000,
        areas: [],
        address: {
          postalCode: "",
          route: "",
          streetNumber: "",
          country: "DE",
          locality: "",
        },
        answers: {
          values: {}
        }
      }
    }
  }

  @bind
  changeCity(event: React.ChangeEvent<HTMLInputElement>) {
    const city = this.props.rentIndexList.filter(i => i.name === event.target.value);
    const o = {
      city: city[0],
      selectedYear: null,
      rentIndexRequest: {
        ...this.state.rentIndexRequest,
        ...{
          address: {
            ...this.state.rentIndexRequest.address,
            city: city[0],
          }
        }
      }
    }

    this.setState(o);
  }

  @bind
  changeYear(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ selectedYear: parseInt(event.target.value) });
  }

  @bind
  renderQuestionCatalog(catalog: QuestionCatalog) {
    return (
      <Col key={catalog.name} xs="12">
        <Card>
          <CardBody>
            <CardTitle><strong>{catalog.name}</strong></CardTitle>
            {catalog.questions.map(this.renderQuestion)}
          </CardBody>
        </Card>
        <br />
      </Col>
    )
  }

  @bind
  setQuestionResult(id: string, new_value: string) {
    const values = this.state.rentIndexRequest.answers.values;
    const new_values = { ...values, [id]: new_value }
    this.setState({
      rentIndexRequest: {
        ...this.state.rentIndexRequest,
        answers: {
          values: new_values,
        }
      }
    })
  }

  exhaustiveOptionToText(a: any) {
    if (isBoolean(a)) {
      return a ? "Ja" : "Nein"
    } else if (isString(a)) {
      return a
    } else {
      return "Type not supported"
    }
  }

  @bind
  renderQuestionForm(question: Question) {
    if (question.questionType == "Exhaustive") {
      return (
        <ListGroup>
          {question.possibleAnswers.map(i =>
            <ListGroupItem color={this.state.rentIndexRequest.answers.values[question.id] === i ? "success" : ""}
              tag="a" href="#" action key={i}
              onClick={(e: any) => { e.preventDefault(); this.setQuestionResult(question.id, i) }}>
              {this.exhaustiveOptionToText(i)}
            </ListGroupItem>)}
        </ListGroup>
      )
    } else {
      return (
        <>
          <Input placeholder={`e.g. ${question.inputType.example}`} onChange={e => this.setQuestionResult(question.id, e.target.value)} />
        </>
      )
    }
  }

  @bind
  updateArea(ev: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      rentIndexRequest: {
        ...this.state.rentIndexRequest,
        areas: [parseInt(ev.target.value)]
      }
    })
  }

  @bind
  renderQuestion(question: Question) {
    return <div key={question.id}>
      <strong>{question.text}</strong>
      <p>{question.description}</p>
      {this.renderQuestionForm(question)}
      <br />
    </div>
  }

  @bind
  updateAddress(field: keyof Address): (event: React.ChangeEvent<HTMLInputElement>) => void {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const o = {
        rentIndexRequest: {
          ...this.state.rentIndexRequest,
          ...{
            address: {
              ...this.state.rentIndexRequest.address,
              [field]: event.target.value,
            }
          }
        }
      }
      this.setState(o)
    }
  }

  @bind
  submit(ev: any) {
    ev.preventDefault();
    this.state.city && this.props.calculateRentIndex(this.state.city.name, this.state.selectedYear as number, this.state.rentIndexRequest)
  }

  render() {
    if (this.props.loading) <h1>Loading</h1>
    return (
      <Form>
        <h3>Rentindex Query</h3>
        <Row>
          <Col xs="8">
            <FormGroup>
              <Label>Choose City</Label>
              <Input type="select" name="city" id="city" value={this.state.city && this.state.city.name || ""} onChange={this.changeCity}>
                <option>Choose city</option>
                {
                  this.props.rentIndexList.map(item =>
                    <option key={item.name} value={item.name}>{item.name}</option>
                  )
                }
              </Input>
            </FormGroup>
          </Col>
          <Col xs="4">
            <FormGroup>
              <Label>Choose Year</Label>
              {
                this.state.city && this.state.city.years && (
                  <Input type="select" name="year" id="year" value={this.state.selectedYear || ""} onChange={this.changeYear}>
                    <option>Choose year</option>
                    {this.state.city.years.map(item =>
                      <option key={item} value={item}>{item}</option>
                    )}
                  </Input>
                )
              }
            </FormGroup>
          </Col>
          <Col>
            <Button disabled={!this.state.city || !this.state.selectedYear}
              type="button"
              onClick={() => this.props.getRentIndex((this.state.city as RentIndexListItem).name, this.state.selectedYear as number)}>
              Get RentIndex
              </Button>
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs="4">
            <FormGroup>
              <Label>Zip Code</Label>
              <Input type="number" name="zip" required={true} value={this.state.rentIndexRequest.address.postalCode} id="zip" onChange={this.updateAddress("postalCode")} />
            </FormGroup>
          </Col>
          <Col xs="8">
            <FormGroup>
              <Label>City</Label>
              <Input name="city" id="city" required={true} value={this.state.rentIndexRequest.address.locality} onChange={this.updateAddress("locality")} />
            </FormGroup>
          </Col>
          <Col xs="8">
            <FormGroup>
              <Label>Street</Label>
              <Input name="street" id="street" required={true} value={this.state.rentIndexRequest.address.route} onChange={this.updateAddress("route")} />
            </FormGroup>
          </Col>
          <Col xs="4">
            <FormGroup>
              <Label>Number</Label>
              <Input name="streetnumber" id="streetnumber" required={true} value={this.state.rentIndexRequest.address.streetNumber} onChange={this.updateAddress("streetNumber")} />
            </FormGroup>
          </Col>
          <Col xs="12">
            <FormGroup>
              <Label>Country</Label>
              <Input type="select" name="country" id="country" required={true} value={this.state.rentIndexRequest.address.country} onChange={this.updateAddress("country")}>
                <option value="DE">Germany</option>
              </Input>
            </FormGroup>
          </Col>
          <Col xs="12">
            <FormGroup>
              <Label>Area</Label>
              <Input name="area" id="area" type="number" required={true} value={this.state.rentIndexRequest.areas[0] | 0} onChange={this.updateArea} />
            </FormGroup>
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs="12"><h3>Question Catalog</h3></Col>
          {
            this.props.rentIndex && this.props.rentIndex.questionCatalogs.map(this.renderQuestionCatalog)
            || <Col xs="12"><Alert color="warning">Select city and year first.</Alert></Col>
          }
          <Col xs="12">
            <Button type="submit" onClick={this.submit}>Submit</Button>
          </Col>
        </Row>
        <br />
        {this.props.result && <Row>
          <Col xs="12">
            <h3>Result</h3>
            <Alert>{JSON.stringify(this.props.result)}</Alert>
          </Col>
        </Row>}
      </Form>
    )
  }
}

export const RentIndex = connect(mapStateToProps, actionBinder)(RentIndexImpl);
