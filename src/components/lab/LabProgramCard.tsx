import { useState } from 'react';
import type { LabProgram } from '../../types';
import { Badge, DifficultyBadge } from '../shared/Badge';
import { CodeBlock } from '../content/CodeBlock';
import { BookmarkButton } from '../shared/BookmarkButton';
import { cn } from '../../utils/cn';

interface LabProgramCardProps {
  program: LabProgram;
}

export function LabProgramCard({ program }: LabProgramCardProps) {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="glass-card p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Badge text={`Lab ${program.id.split('-').pop()}`} variant="accent" />
            <DifficultyBadge level={program.difficulty} />
          </div>
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">{program.title}</h2>
        </div>
        <BookmarkButton id={`bm-${program.id}`} type="example" targetId={program.id} title={program.title} />
      </div>

      {/* Problem Statement */}
      <div>
        <h3 className="text-sm font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wide mb-2">Problem Statement</h3>
        <p className="text-base text-[var(--color-text-primary)]">{program.statement}</p>
      </div>

      {/* Test Cases */}
      <div>
        <h3 className="text-sm font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wide mb-3">Test Cases</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {program.testCases.map((tc, idx) => (
            <div key={idx} className="bg-[var(--color-bg-hover)] p-4 rounded-lg border border-[var(--color-border-primary)]">
              <div className="mb-2">
                <span className="text-xs font-semibold text-[var(--color-text-muted)]">Input:</span>
                <code className="block mt-1 text-sm text-[var(--color-code-string)]">{tc.input || '(None)'}</code>
              </div>
              <div>
                <span className="text-xs font-semibold text-[var(--color-text-muted)]">Expected Output:</span>
                <code className="block mt-1 text-sm text-[var(--color-success)]">{tc.output}</code>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Solution Toggle */}
      <div>
        <button
          onClick={() => setShowSolution(!showSolution)}
          className={cn(
            "w-full flex items-center justify-between p-4 rounded-lg font-medium transition-all",
            showSolution 
              ? "bg-[var(--color-bg-active)] text-[var(--color-text-primary)]" 
              : "bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-active)] hover:text-[var(--color-text-primary)]"
          )}
        >
          <span>{showSolution ? 'Hide Reference Solution' : 'Show Reference Solution'}</span>
          <svg className={cn("w-5 h-5 transition-transform", showSolution ? "rotate-180" : "")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showSolution && (
          <div className="mt-4 animate-fade-in space-y-4">
            <CodeBlock code={program.referenceSolution} title={`${program.id}.c`} />
            {program.commonMistakes && program.commonMistakes.length > 0 && (
              <div className="bg-[var(--color-warning-bg)] border-l-4 border-[var(--color-warning)] p-4 rounded-r-lg mt-4">
                <h4 className="text-sm font-semibold text-[var(--color-warning)] flex items-center gap-2 mb-2">
                  <span>⚠️</span> Common Pitfalls
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-[var(--color-text-primary)]">
                  {program.commonMistakes.map((mistake, i) => (
                    <li key={i}>{mistake}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
