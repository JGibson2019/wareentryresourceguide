import * as React from "react";

interface IOrganizationProps {
  name: string;
  // description: string;
  // county: string;
  // address: string;
  email: string;
  // phoneNumber: string;
}

export class Organization extends React.Component<IOrganizationProps, {}> {
  public render() {
    return (
      <div>
        <h1>{this.props.name} </h1>
        Email: {this.props.email}
      </div>
    );
  }
}
