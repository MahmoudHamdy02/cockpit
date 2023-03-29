/*
 * This file is part of Cockpit.
 *
 * Copyright (C) 2019 Red Hat, Inc.
 *
 * Cockpit is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation; either version 2.1 of the License, or
 * (at your option) any later version.
 *
 * Cockpit is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Cockpit; If not, see <http://www.gnu.org/licenses/>.
 */

import React from "react";
import { Flex } from "@patternfly/react-core/dist/esm/layouts/Flex/index.js";
import { ExclamationCircleIcon } from '@patternfly/react-icons';

import { page_status } from "notifications";
import { Button } from "@patternfly/react-core";

export class FullStorageWarning extends React.Component {
    constructor() {
        super();
        this.state = { };
        this.on_page_status_changed = () => this.setState({ });
    }

    componentDidMount() {
        page_status.addEventListener("changed", this.on_page_status_changed);
    }

    componentWillUnmount() {
        page_status.removeEventListener("changed", this.on_page_status_changed);
    }

    render() {
        console.log(page_status);
        const status = page_status.get("system");
        if (status)
            console.log(status);
        return (
            <li id="page_status_notification_storage_warning" key="storage_warning">
                {!status && <Button variant="link" isInline component="a" onClick={ () => { page_status.set_own({ type: "error", title: "'path' is almost full" }) } }>Test</Button>}
                {status &&
                <Flex flexWrap={{ default: 'nowrap' }} spaceItems={{ default: 'spaceItemsSm' }} alignItems={{ default: 'alignItemsCenter' }}>
                    <ExclamationCircleIcon className="ct-exclamation-circle" />
                    {status.title}
                </Flex>
                }
            </li>
        );
    }
}
