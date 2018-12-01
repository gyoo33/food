import React from "react";

const GoogleSearch = props => (
  <form>
    <div className="form-group">
      <label htmlFor="Query">
        <strong>Location</strong>
      </label>
      <input
        className="form-control"
        id="Title"
        type="text"
        value={props.q}
        placeholder="Union Square"
        name="q"
        onChange={props.handleInputChange}
        required
      />
    </div>
    <div className="pull-right">
      <button
        onClick={props.handleFormSubmit}
        type="submit"
        className="btn btn-lg btn-success float-right"
      >
        Search
      </button>
    </div>
  </form>
);

export default GoogleSearch;
