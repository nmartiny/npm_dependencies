import React, {Component} from 'react'
import ApiClient from '../../helpers/ApiClient'
import {Table, Loader, Dimmer} from 'semantic-ui-react'

const color = 'black'

class NonConnectedAllDependencies extends Component {

  state = {
    deps: [],
    isLoading: false
  }

  async componentDidMount() {
    this.setState({isLoading: true})
    const depsWithoutFilter = await ApiClient.requestAllDeps()
    const deps = depsWithoutFilter.filter(dep => {
      return dep.name && dep.version
    })
    this.setState({deps, isLoading: false})
  }

  _renderHeaderTable() {
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>NPM Name</Table.HeaderCell>
          <Table.HeaderCell>Installed Version</Table.HeaderCell>
          <Table.HeaderCell>URL Installed Version</Table.HeaderCell>
          <Table.HeaderCell>URL Latest Version</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    )
  }

  _renderBodyTable() {
    return (
      <Table.Body>
        {this.state.deps.map(dep =>
          <Table.Row>
            <Table.Cell>{dep.name}</Table.Cell>
            <Table.Cell>{dep.version}</Table.Cell>
            <Table.Cell>
              <a href={`https://www.npmjs.com/package/${dep.name}/v/${dep.version}`} rel='noopener noreferrer' target='_blank'>Click for Info</a>
            </Table.Cell>
            <Table.Cell>
              <a href={`https://www.npmjs.com/package/${dep.name}`} rel='noopener noreferrer' target='_blank'>Click for Info</a>
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    )
  }

  render() {
    if(this.state.isLoading) {
      return (
        <div>
          <Dimmer active inverted>
            <Loader inverted content='Loading...' size='large' />
          </Dimmer>
        </div>
      )
    }
    return (
      <div>
        <Table color={color} key={color} textAlign='center'>
          {this._renderHeaderTable()}
          {this._renderBodyTable()}
        </Table>
      </div>
    )
  }

}

export default NonConnectedAllDependencies