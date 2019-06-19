import React from 'react';
import { Row, Col } from 'antd';
import GGEditor, { Flow } from 'gg-editor';
import EditorMinimap from '../components/EditorMinimap';
import { FlowContextMenu } from '../components/EditorContextMenu';
import { FlowToolbar } from '../components/EditorToolbar';
import { FlowItemPanel } from '../components/EditorItemPanel';
import { FlowDetailPanel } from '../components/EditorDetailPanel';
import './index.css';


GGEditor.setTrackable(false);
const data = {
  nodes: [{
    type: 'node',
    size: '70*70',
    shape: 'flow-circle',
    color: '#FA8C16',
    label: '起止节点',
    x: 55,
    y: 55,
    id: 'ea1184e8',
    index: 0,
  }, {
    type: 'node',
    size: '70*70',
    shape: 'flow-circle',
    color: '#FA8C16',
    label: '结束节点',
    x: 55,
    y: 255,
    id: '481fbb1a',
    index: 2,
  }],
  edges: [{
    source: 'ea1184e8',
    sourceAnchor: 2,
    target: '481fbb1a',
    targetAnchor: 0,
    id: '7989ac70',
    index: 1,
  }],
};
const DefectRolesFlow = () => {
  return (
   
      <GGEditor className="editor">
        <Row type="flex" className="editorHd">
          <Col span={24}>
            <FlowToolbar />
          </Col>
        </Row>
        <Row type="flex" className="editorBd">
          <Col span={4} className="editorSidebar">
            <FlowItemPanel />
          </Col>
          <Col span={16} className="editorContent">
            <Flow className="flow" data={data} />
          </Col>
          <Col span={4} className="editorSidebar">
            <FlowDetailPanel />
            <EditorMinimap />
          </Col>
        </Row>
        <FlowContextMenu />
      </GGEditor>
  
  );
};

export default DefectRolesFlow;
