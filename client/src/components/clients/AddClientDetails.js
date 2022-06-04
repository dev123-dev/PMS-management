import React from "react";

export const AddClientDetails = () => {
  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align">
        <form className="row" onSubmit={(e) => onSubmit(e)}>
          <div className="col-lg-11 col-md-11 col-sm-12 col-12">
            <h2 className="heading_color">Add SHG Details </h2>
            <hr />
          </div>
          <section className="sub_reg">
            <div className="row col-lg-11 col-md-11 col-sm-12 col-12 ">
              <div className="col-lg-6 col-md-12 col-sm-12 col-12 py-3">
                <div className="row card-new  pb-3">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <h5>SHG Info </h5>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <label className="label-control">SHG Name*:</label>
                    <input
                      type="text"
                      name="batchName"
                      value={batchName}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                      required
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <label className="label-control">
                      Contact Person Phone:
                    </label>
                    <input
                      type="number"
                      name="batchPhone"
                      value={batchPhone}
                      className="form-control"
                      onWheel={() => document.activeElement.blur()}
                      onChange={(e) => onInputChange(e)}
                      onKeyDown={(e) =>
                        (e.keyCode === 69 || e.keyCode === 190) &&
                        e.preventDefault()
                      }
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <label className="label-control">
                      Contact Person Name:
                    </label>
                    <input
                      type="text"
                      name="batchContactPerson"
                      value={batchContactPerson}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <label
                      className="label-control"
                      style={InchargeIdErrorStyle}
                    >
                      Select Incharge*:
                    </label>
                    <Select
                      name="userFullName"
                      options={allincharges}
                      isSearchable={true}
                      value={incharge}
                      placeholder="Select Incharge"
                      onChange={(e) => onInchargeChange(e)}
                      theme={(theme) => ({
                        ...theme,
                        height: 26,
                        minHeight: 26,
                        borderRadius: 1,
                        colors: {
                          ...theme.colors,
                          primary: "black",
                        },
                      })}
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <label className="label-control">
                      SHG Formation Date*:
                    </label>

                    <input
                      type="date"
                      placeholder="dd/mm/yyyy"
                      className="form-control cpp-input datevalidation"
                      name="batchFormationDate"
                      value={startSelectedDate}
                      onChange={(e) => onDateChange(e)}
                      style={{
                        width: "65%",
                      }}
                      required
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <label
                      className="label-control"
                      style={MeetingTypeErrorStyle}
                    >
                      Meeting Type*:
                    </label>

                    <Select
                      name="meetingType"
                      options={MeetingTypeMethods}
                      isSearchable={false}
                      value={meetingType}
                      placeholder="Select"
                      onChange={(e) => onMeetingChange(e)}
                      theme={(theme) => ({
                        ...theme,
                        height: 26,
                        minHeight: 26,
                        borderRadius: 1,
                        colors: {
                          ...theme.colors,
                          primary: "black",
                        },
                      })}
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <label
                      className="label-control"
                      style={TranscationIdErrorStyle}
                    >
                      SHG Transcation Type*:
                    </label>
                    <Select
                      name="batchTransactionType"
                      options={TranscationMethods}
                      isSearchable={false}
                      value={batchTransactionType}
                      placeholder="Select Meeting Type"
                      onChange={(e) => onbatchTransactionTypeChange(e)}
                      theme={(theme) => ({
                        ...theme,
                        height: 26,
                        minHeight: 26,
                        borderRadius: 1,
                        colors: {
                          ...theme.colors,
                          primary: "black",
                        },
                      })}
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <label className="label-control">SHG Saving Amount:</label>
                    <input
                      type="number"
                      name="batchSavingAmt"
                      value={batchSavingAmt}
                      className="form-control"
                      onWheel={() => document.activeElement.blur()}
                      onChange={(e) => onInputChange(e)}
                      onKeyDown={(e) =>
                        (e.keyCode === 69 || e.keyCode === 190) &&
                        e.preventDefault()
                      }
                      required
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <label className="label-control">
                      SHG Subscription Amount*:
                    </label>
                    <input
                      type="number"
                      name="batchSubscriptionAmt"
                      value={batchSubscriptionAmt}
                      className="form-control"
                      onWheel={() => document.activeElement.blur()}
                      onChange={(e) => onInputChange(e)}
                      onKeyDown={(e) =>
                        (e.keyCode === 69 || e.keyCode === 190) &&
                        e.preventDefault()
                      }
                      required
                    />
                  </div>
                  {loggedUserInstitutionData.institutionType === "Zoned" ? (
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <label className="label-control">SHG Code*:</label>
                      <input
                        type="text"
                        name="batchCode"
                        value={bCode}
                        className="form-control"
                        onChange={(e) => onInputChange(e)}
                        editable={false}
                      />
                    </div>
                  ) : (
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <label className="label-control">SHG Code*:</label>
                      <input
                        type="text"
                        name="batchCode"
                        value={batchCode}
                        className="form-control"
                        onChange={(e) => onInputChange(e)}
                        required
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="row col-lg-6 col-md-12 col-sm-12 col-12">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12 py-3 no_padding">
                  <div className="row card-new pb-3">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                      <h5>Area Info </h5>
                    </div>

                    <div className="row ccol-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
                      <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        <label className="label-control">Address line1*:</label>
                        <input
                          type="text"
                          name="batchAddressLine1"
                          value={batchAddressLine1}
                          className="form-control"
                          onChange={(e) => onInputChange(e)}
                          required
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        <label className="label-control">Address line2*:</label>
                        <input
                          type="text"
                          name="batchAddressLine2"
                          value={batchAddressLine2}
                          className="form-control"
                          onChange={(e) => onInputChange(e)}
                          required
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        <label className="label-control">City*:</label>
                        <input
                          type="text"
                          name="city"
                          value={city}
                          className="form-control"
                          onChange={(e) => onInputChange(e)}
                          required
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        <label
                          className="label-control"
                          style={StateErrorStyle}
                        >
                          State*:
                        </label>
                        <Select
                          name="stateName"
                          options={allstates}
                          isSearchable={true}
                          value={state}
                          placeholder="Select State"
                          onChange={(e) => onStateChange(e)}
                          theme={(theme) => ({
                            ...theme,
                            height: 26,
                            minHeight: 26,
                            borderRadius: 1,
                            colors: {
                              ...theme.colors,
                              primary: "black",
                            },
                          })}
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        <label
                          className="label-control"
                          style={DistrictErrorStyle}
                        >
                          District*:
                        </label>
                        <Select
                          name="districtName"
                          options={alldistrict}
                          isSearchable={true}
                          value={district}
                          placeholder="Select District"
                          onChange={(e) => ondistrictChange(e)}
                          theme={(theme) => ({
                            ...theme,
                            height: 26,
                            minHeight: 26,
                            borderRadius: 1,
                            colors: {
                              ...theme.colors,
                              primary: "black",
                            },
                          })}
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        <label className="label-control">Taluk:</label>
                        <input
                          type="text"
                          name="taluku"
                          value={taluku}
                          className="form-control"
                          onChange={(e) => onInputChange(e)}
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        <label className="label-control">Pincode*:</label>
                        <input
                          type="number"
                          name="pincode"
                          value={pincode}
                          className="form-control"
                          onWheel={() => document.activeElement.blur()}
                          onChange={(e) => onInputChange(e)}
                          onKeyDown={(e) =>
                            (e.keyCode === 69 || e.keyCode === 190) &&
                            e.preventDefault()
                          }
                          required
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        <label className="label-control">Ward:</label>
                        <input
                          type="text"
                          name="ward"
                          value={ward}
                          className="form-control"
                          onChange={(e) => onInputChange(e)}
                        />
                      </div>{" "}
                      {showBatchSection && (
                        <>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                            <label
                              className="label-control"
                              style={VaradoErrorStyle}
                            >
                              Varado*:
                            </label>
                            <Select
                              name="varadoName"
                              options={allvarado}
                              isSearchable={true}
                              value={varado}
                              placeholder="Select Varado"
                              onChange={(e) => onVaradoChange(e)}
                              theme={(theme) => ({
                                ...theme,
                                height: 26,
                                minHeight: 26,
                                borderRadius: 1,
                                colors: {
                                  ...theme.colors,
                                  primary: "black",
                                },
                              })}
                            />
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                            <label
                              className="label-control"
                              style={ParishErrorStyle}
                            >
                              Parish*:
                            </label>
                            <Select
                              name="parishName"
                              options={allparish}
                              isSearchable={true}
                              value={parish}
                              placeholder="Select Parish"
                              onChange={(e) => onParishChange(e)}
                              theme={(theme) => ({
                                ...theme,
                                height: 26,
                                minHeight: 26,
                                borderRadius: 1,
                                colors: {
                                  ...theme.colors,
                                  primary: "black",
                                },
                              })}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="row card-new pb-3">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <h5>Bank Info </h5>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                    <label className="label-control">Bank Name:</label>
                    <input
                      type="text"
                      name="batchBankName"
                      value={batchBankName}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                    <label className="label-control">IFSC Code:</label>
                    <input
                      type="text"
                      name="batchBankIFSC"
                      value={batchBankIFSC}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                    <label className="label-control">Account Number:</label>
                    <input
                      type="text"
                      name="batchBankAccountNumber"
                      value={batchBankAccountNumber}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                    <label className="label-control">Branch:</label>
                    <input
                      type="text"
                      name="batchBankBranch"
                      value={batchBankBranch}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              className="row col-lg-11 col-md-11 col-sm-12 col-12 Savebutton no_padding"
              size="lg"
            >
              <div className="col-lg-8 col-md-6 col-sm-12 col-12">
                <label className="label-control colorRed">
                  * Indicates mandatory fields, Please fill mandatory fields
                  before Submit
                </label>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                {loading ? (
                  <button
                    className="btn sub_form btn_continue blackbrd Save float-right"
                    disabled
                  >
                    Loading...
                  </button>
                ) : (
                  <input
                    type="submit"
                    name="Submit"
                    value="Submit"
                    className="btn sub_form btn_continue blackbrd Save float-right"
                  />
                )}
                <Link
                  className="btn sub_form btn_continue blackbrd float-right"
                  to="/all-batches"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </section>
        </form>
        <Modal
          show={showUpdateModal}
          backdrop="static"
          keyboard={false}
          size="xl"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <div className="col-lg-10">
              <h3 className="modal-title text-center">
                Preview of Add SHG Details
              </h3>
            </div>
            <div className="col-lg-2">
              <button onClick={handleUpdateModalClose} className="close">
                <img
                  src={require("../../static/images/close.png")}
                  alt="X"
                  style={{ height: "20px", width: "20px" }}
                />
              </button>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="container container_align">
              <section className="sub_reg">
                <div className="row col-lg-12 col-md-11 col-sm-12 col-12 ">
                  <div className="col-lg-6 col-md-12 col-sm-12 col-12 py-3">
                    <div className="row card-new  pb-3">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                        <h5>SHG Info </h5>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        <label className="label-control">
                          SHG Name:{batchName}
                        </label>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        <label className="label-control">
                          Contact Person Phone:{batchPhone}
                        </label>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        <label className="label-control">
                          Contact Person Name:{batchContactPerson}
                        </label>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        <label className="label-control">
                          Select Incharge:{userFullName}
                        </label>
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        <label className="label-control">
                          SHG Formation Date:{shgformDate}
                        </label>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        <label className="label-control">
                          Meeting Type:{meetingType.value}
                        </label>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        <label className="label-control">
                          SHG Transcation Type:{batchTransactionType.value}
                        </label>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        <label className="label-control">
                          SHG Monthly Saving Amount:{batchSavingAmt}
                        </label>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        <label className="label-control">
                          SHG Subscription Amount:{batchSubscriptionAmt}
                        </label>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        <label className="label-control">
                          SHG Code:{bCode || batchCode}
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12 py-3 no_padding">
                      <div className="row card-new pb-3">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                          <h5>Area Info </h5>
                        </div>

                        <div className="row ccol-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
                          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                            <label className="label-control">
                              Address line1:{batchAddressLine1}
                            </label>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                            <label className="label-control">
                              Address line2:{batchAddressLine2}
                            </label>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                            <label className="label-control">City:{city}</label>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                            <label className="label-control">
                              State:{stateName}
                            </label>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                            <label className="label-control">
                              District:{districtName}
                            </label>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                            <label className="label-control">
                              Taluk:{taluku}
                            </label>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                            <label className="label-control">
                              Pincode:{pincode}
                            </label>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                            <label className="label-control">Ward:{ward}</label>
                          </div>
                          {showBatchSection && (
                            <>
                              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                <label className="label-control">
                                  Varado:{varadoName}
                                </label>
                              </div>
                              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                <label className="label-control">
                                  Parish:{parishName}
                                </label>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="row card-new pb-3">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                        <h5>Bank Info </h5>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                        <label className="label-control">
                          Bank Name:{batchBankName}
                        </label>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                        <label className="label-control">
                          IFSC Code:{batchBankIFSC}
                        </label>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                        <label className="label-control">
                          Account Number:{batchBankAccountNumber}
                        </label>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                        <label className="label-control">
                          Branch:{batchBankBranch}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="row col-lg-12 col-md-11 col-sm-12 col-12 Savebutton no_padding"
                  size="lg"
                >
                  <div className="col-lg-12 col-md-6 col-sm-12 col-12">
                    {loading ? (
                      <button
                        className="btn sub_form btn_continue blackbrd Save float-right"
                        disabled
                      >
                        Loading...
                      </button>
                    ) : (
                      <button
                        variant="success"
                        className="btn sub_form btn_continue blackbrd Save float-right"
                        onClick={() => onSaveSubmit()}
                      >
                        Save
                      </button>
                    )}
                    <Link
                      className="btn sub_form btn_continue blackbrd float-right"
                      onClick={handleUpdateModalClose}
                    >
                      Cancel
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </Fragment>
  );
};
