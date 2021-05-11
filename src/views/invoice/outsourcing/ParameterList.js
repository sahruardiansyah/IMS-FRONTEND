import React from "react";
const ParameterList = props => {
    return props.parameterList.map((val, idx) => {
        let 
            manPower = `awal-${idx}`

        return (
            <div className="form-row" key={val.index} >
                <div className="col p-2">
                    {/* <label> Man Power </label> */}
                    <input
                        type="number"
                        className="form-control required"
                        name="awal"
                        data-id={idx}
                        id={manPower}
                    />
                </div>
                <div className="col p-2">
                    {idx === 0 ? (
                        <button
                            onClick={() => props.add()}
                            type="button"
                            className="btn btn-primary text-center"
                        >+
                            <i className="fa fa-plus-circle" aria-hidden="true" />
                        </button>
                    ) : (
                        <button
                            className="btn btn-danger"
                            onClick={() => props.delete(val)}
                        >-
                            <i className="fa fa-minus" aria-hidden="true" />
                        </button>
                    )}
                </div>
            </div>
        )
    })
}
export default ParameterList;