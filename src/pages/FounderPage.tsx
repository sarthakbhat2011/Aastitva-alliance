import React from 'react';
import { Page } from '../types';
import { AboutFounderPage } from './AboutFounderPage';

interface Props {
  onNavigate: (page: Page) => void;
}

export const FounderPage: React.FC<Props> = ({ onNavigate }) => {
  return <AboutFounderPage onNavigate={onNavigate} />;
};
