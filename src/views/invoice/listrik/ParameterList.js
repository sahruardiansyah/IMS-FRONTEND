import React from "react";
const ParameterList = props => {
    return props.parameterList.map((val, idx) => {
        let 
            lwbpAwal = `lwbpAwal-${idx}`,
            lwbpAkhir = `lwbpAkhir-${idx}`,
            usageLwbp = `usageLwbp-${idx}`,
            wbpAwal = `wbpAwal-${idx}`,
            wbpAkhir = `wbpAkhir-${idx}`,
            usagWbp = `usageWbp-${idx}`,
            denda = `denda-${idx}`,
            lineKeterangan = `lineKeterangan-${idx}`,
            amountLine = `amountLine-${idx}`;

        return (
            <div className="form-row" key={val.index}>
                <div className="col">
                    <label>LWBP Awal</label>
                    <input
                        type="number"
                        className="form-control required"
                        name="lwbpAwal"
                        data-id={idx}
                        id={lwbpAwal}

                    />
                </div>
                <div className="col">
                    <label>LWBP Akhir</label>
                    <input
                        type="number"
                        className="form-control required"
                        name="lwbpAkhir"
                        id={lwbpAkhir}
                        data-id={idx}

                    />
                </div>
                <div className="col">
                    <label>Usage LWBP</label>
                    <input
                        type="number"
                        className="form-control required"
                        name="usageLwbp"
                        id={usageLwbp}
                        data-id={idx}

                    />
                </div>
                <div className="col">
                    <label>WBP Awal</label>
                    <input
                        type="number"
                        className="form-control required"
                        name="wbpAwal"
                        id={wbpAwal}
                        data-id={idx}

                    />
                </div>
                <div className="col">
                    <label>WBP Akhir</label>
                    <input
                        type="number"
                        className="form-control"
                        name="wbpAkhir"
                        id={wbpAkhir}
                        data-id={idx}

                    />
                </div>
                <div className="col">
                    <label>WBP Usage</label>
                    <input
                        type="number"
                        className="form-control"
                        name="usageWbp"
                        id={usagWbp}
                        data-id={idx}

                    />
                </div>
                <div className="col">
                    <label>WBP Usage</label>
                    <input
                        type="number"
                        className="form-control"
                        name="usageWbp"
                        id={usagWbp}
                        data-id={idx}

                    />
                </div>
                <div className="col">
                    <label>Denda</label>
                    <input
                        type="number"
                        className="form-control"
                        name="denda"
                        id={denda}
                        data-id={idx}

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