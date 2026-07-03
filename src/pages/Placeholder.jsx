import React from 'react';
import PageHeader from '../components/PageHeader';

export default function Placeholder({ title }) {
  return (
    <div>
      <PageHeader title={title} subtitle="This page is under construction in this build." />
      <div className="glass card p-10 text-center text-slate-400 text-sm">Coming soon.</div>
    </div>
  );
}
