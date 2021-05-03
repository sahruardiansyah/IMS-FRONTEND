import React from "react";
const ParameterList = props => {
    return props.parameterList.map((val, idx) => {
        let 
            awal = `awal-${idx}`,
            akhir = `akhir-${idx}`,
            gasUsage = `gasUsage-${idx}`,
            tarif = `denda-${idx}`,
            lineKeterangan = `lineKeterangan-${idx}`,
            amountLine = `amountLine-${idx}`;

        return (
            <div className="form-row" key={val.index}>
                <div className="col">
                    <label> Awal </label>
                    <input
                        type="number"
                        className="form-control required"
                        name="awal"
                        data-id={idx}
                        id={awal}
                        // value={val.awal}

                    />
                </div>
                <div className="col">
                    <label>Akhir</label>
                    <input
                        type="number"
                        className="form-control required"
                        name="akhir"
                        id={akhir}
                        data-id={idx}
                        // value={val.akhir}

                    />
                </div>
                <div className="col">
                    <label>Usage</label>
                    <input
                        type="number"
                        className="form-control required"
                        name="usage"
                        id={gasUsage}
                        data-id={idx}
                        // value={val.airUsage}

                    />
                </div>
                <div className="col">
                    <label>Tarif</label>
                    <input
                        type="number"
                        className="form-control required"
                        name="tarif"
                        id={tarif}
                        data-id={idx}
                        // value={val.wbpAwal}

                    />
                </div>
               <div className="col">
                    <label>Keterangan</label>
                    <input
                        type="number"
                        className="form-control"
                        name="denda"
                        id={lineKeterangan}
                        data-id={idx}
                        // value={val.lineKeterangan}

                    />
                </div>
                <div className="col">
                    <label>Amount Line</label>
                    <input
                        type="number"
                        className="form-control"
                        name="amountLine"
                        id={amountLine}
                        data-id={idx}
                        // value={val.amountLine}

                    />
                </div>
                <div className="col p-4">
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