import React from 'react';
import { Row, Col } from 'antd';
import GGEditor, { Flow } from 'gg-editor';
import EditorMinimap from '../DSFcomponents/EditorMinimap';
import { FlowContextMenu } from '../DSFcomponents/EditorContextMenu';
import { FlowToolbar } from '../DSFcomponents/EditorToolbar';
import { FlowItemPanel } from '../DSFcomponents/EditorItemPanel';
import { FlowDetailPanel } from '../DSFcomponents/EditorDetailPanel';
import './index.css';


GGEditor.setTrackable(false);

const DefectStatusFlow = () => {
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
            <Flow className="flow" />
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

export default DefectStatusFlow;
