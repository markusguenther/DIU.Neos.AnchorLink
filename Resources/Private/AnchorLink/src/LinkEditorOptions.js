import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { $get } from "plow-js";
import { connect } from "react-redux";

import { SelectBox } from "@neos-project/react-ui-components";
import { selectors } from "@neos-project/neos-ui-redux-store";

const fetchOptions = node =>
  fetch(`/link-resolver/resolveAnchors?node=${node}`, {
    credentials: "include"
  }).then(response => response.json());

@connect(state => ({
  focusedNodeContextPath: selectors.CR.Nodes.focusedNodePathSelector(state)
}))
export default class LinkEditorOptions extends PureComponent {
  state = {
    options: [],
    loading: false,
    error: false
  };

  componentDidMount() {
    this.setState({ loading: true, error: false });
    fetchOptions(this.props.focusedNodeContextPath)
      .then(options => this.setState({ options, loading: false, error: false }))
      .catch(reason => {
        console.error(reason);
        this.setState({ error: true, loading: false });
      });
  }

  render() {
    const { linkValue, onLinkChange } = this.props;
    const anchorValue =
      typeof linkValue === "string" ? linkValue.split("#")[1] : "";
    const baseValue =
      typeof linkValue === "string" ? linkValue.split("#")[0] : "";

    const onChange = value => {
      onLinkChange(value ? `${baseValue}#${value}` : baseValue);
    };

    return $get("anchorLink", this.props.linkingOptions) ? (
      <div style={{ flexGrow: 1 }}>
        <div style={{ padding: 8 }}>
          Link anchor
          {this.state.error ? (
            <div style={{ color: "red" }}>
              There was an error resolving link anchors
            </div>
          ) : (
            <SelectBox
              options={this.state.options}
              optionValueField="value"
              value={anchorValue}
              onValueChange={onChange}
              placeholder="Choose link anchor"
              allowEmpty={true}
              displayLoadingIndicator={this.state.loading}
            />
          )}
        </div>
      </div>
    ) : null;
  }
}
