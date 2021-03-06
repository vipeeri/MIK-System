import React from 'react';
import moment from 'moment'
import { Field, reduxForm } from 'redux-form';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import SelectInput from '../form_fields/bootstrap_select_input';
import ObjectSelectInput from '../form_fields/object_select_input';
import TimePickerInput from '../form_fields/timepicker_input';
import DatePickerInput from '../form_fields/datepicker_input';
import TextAreaInput from '../form_fields/textarea_input';
import { setReservationStart, setReservationEnd } from '../../store/actions/reservationsActions';
import { normalizeDatePicker, normalizeTimePicker } from "../../services/normalizers/normalizers";

moment.locale('fi');

export class ReservationForm extends React.Component {
    render() {
        const { handleSubmit, submitting, planes, reservations, dispatch, sidebarMod } = this.props;

        const startOnChange = (event, newValue, previousValue) => {
            setReservationStart(newValue, reservations, dispatch);
        };

        const endOnChange = (event, newValue, previousValue) => {
            setReservationEnd(newValue, reservations, dispatch);
        };

        return (
            <form onSubmit={handleSubmit}>
                <Field label="Alkupäivämäärä" name="start" id="res-start-date"
                       onChange={startOnChange} component={DatePickerInput} normalize={normalizeDatePicker()} />
                <Field label="Alkuaika" name="start" id="res-start-time"
                       onChange={startOnChange} component={TimePickerInput} normalize={normalizeTimePicker()} />
                <Field label="Loppupäivämäärä" name="end" id="res-end-date"
                       onChange={endOnChange} component={DatePickerInput} normalize={normalizeDatePicker()} />
                <Field label="Loppuaika" name="end" id="res-end-time"
                       onChange={endOnChange} component={TimePickerInput} normalize={normalizeTimePicker()} />
                <Field label="Lentokone" name="plane_id" options={planes} component={ObjectSelectInput} />
                { sidebarMod ? <Field label="Tyyppi" name="reservation_type" options={["harraste", "opetus"]}
                       component={SelectInput} /> : null }
                <Field label={ sidebarMod ? 'Lisätiedot' : 'Perumisen syy'} name="additional_info" componentClass="textarea" component={TextAreaInput} />
                <Button type="submit">
                    { sidebarMod ? 'Tallenna varaus' : 'Poista varaukset'} { submitting ? '...' : null }
                </Button>
            </form>
        )
    }
}

ReservationForm = reduxForm({
    form: 'ReservationForm',
})(ReservationForm);

ReservationForm = connect((store) => {
    return {
        planes: store.planes.planes,
        reservations: store.reservations.reservations,
        sidebarMod: store.reservations.sidebarMod,
        initialValues: {
            start: store.reservations.start,
            end: store.reservations.end,
            reservation_type: 'harraste',
            plane_id: 1
        }
    }
})(ReservationForm);

export default ReservationForm;
