import '../css/form.css'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import ReactDatePicker from 'react-datepicker'
import BasicModal from './ModalValidation'
import { useDispatch } from 'react-redux'
import { addEmployee } from '../redux/reducer'
import 'react-datepicker/dist/react-datepicker.css'

import Select from './Select'

export function Form() {
    const { register, handleSubmit, control } = useForm()

    const departments = [
        {label: 'Sales', value: 'Sales'},
        {label: 'Marketing', value: 'Marketing'},
        {label: 'Engineering', value: 'Engineering'},
        {label: 'Human Resources', value: 'Human Resources'},
        {label: 'Legal', value: 'Legal'},
    ]

    const states = [
        {label: 'Alabama', value: 'AL'},
        {label: 'Alabama2', value: 'AL2'},
    ]

    const dispatch = useDispatch()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState(new Date())
    const [department, setDepartment] = useState('Engineering')
    const [state, setState] = useState('AL2')


    const onSubmit = (data) => {
        const employee = {
            firstName,
            lastName,
            dateOfBirth,
            startDate: data.startDate,
            street: data.street,
            city: data.city,
            state,
            zipCode: data.zipCode,
            department
        }
        console.log(employee)
        dispatch(addEmployee(employee))
    }

    return (
        <div className="containertmr">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="main_container">
                    <div className="left_container">
                        <section className="topForm_container">
                            <input
                                type="text"
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                                placeholder="First name"
                            />
                            <input
                                type="text"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                                placeholder="Last name"
                            />

                            <div className="date_container">
                                <ReactDatePicker
                                    selected={dateOfBirth}
                                    placeholderText="Date of Birth"
                                    onChange={(date) =>
                                        setDateOfBirth(date)
                                    }
                                    dateFormat="dd/MM/yyyy"
                                />
                            </div>
                            <div className="startDate_container">
                                <Controller
                                    control={control}
                                    name="Start Date"
                                    render={({ field }) => (
                                        <ReactDatePicker
                                            {...register('startDate')}
                                            placeholderText="Start Date"
                                            selected={field.value}
                                            type="date"
                                            dateFormat="dd/MM/yyyy"
                                            onChange={(date) =>
                                                field.onChange(date)
                                            }
                                        />
                                    )}
                                />
                            </div>
                        </section>
                        <section className="department_container">
                            <label for="department">Department</label>
                            <Select
                                items={departments}
                                onChange={(department) => setDepartment(department)}
                                selected={department}
                            />
                        </section>
                    </div>
                    <div className="right_container">
                        {' '}
                        <section class="address_container">
                            <legend>Address</legend>

                            <label for="street">Street</label>
                            <input
                                id="street"
                                {...register('sreet')}
                                type="text"
                            />

                            <label for="city">City</label>
                            <input
                                {...register('city')}
                                id="city"
                                type="text"
                            />

                            <label for="state">State</label>
                            <Select
                                items={states}
                                onChange={state => setState(state)}
                                selected={state}
                            />
                            <select
                                {...register('state')}
                                name="state"
                                id="state"
                            ></select>

                            <label for="zip-code">Zip Code</label>
                            <input
                                {...register('zipCode')}
                                id="zip-code"
                                type="number"
                            />
                        </section>
                    </div>
                </div>

                <BasicModal />
            </form>
        </div>
    )
}
