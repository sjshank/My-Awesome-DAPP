import React from 'react';
import { Badge } from 'react-bootstrap';

const SectionHeader = (props) => (
    <h4>
        <Badge className="bg-dark p-2 text-white">{props.header}</Badge>
    </h4>
)

export default SectionHeader;