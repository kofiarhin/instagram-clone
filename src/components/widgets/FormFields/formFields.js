import React from "react";

const FormFields = ({ formData, id, change }) => {

    const renderField = () => {

        const type = formData.element;
        let formTemplate = null;

        // console.log(type);
        switch (type) {


            case "input":

                formTemplate = (
                    <div className="form-element">
                        <input {...formData.config} value={formData.value} onChange={(event) => change({ event, id, blur: false })} />

                    </div>
                )
                break;

            case "textarea":

                formTemplate = <div className="from-element">
                    <textarea value={formData.value} onChange={(event) => change({ event, id, blur: false })} />
                </div>
                break;
            default:
                formTemplate = null;
                break;
        }

        return formTemplate;
    }
    return <div> {renderField()} </div>
}

export default FormFields;