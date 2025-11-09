import React from 'react';
import type { TradingSettings } from '../types';
import { PlayIcon } from './icons/PlayIcon';
import { PauseIcon } from './icons/PauseIcon';

interface ControlPanelProps {
  settings: TradingSettings;
  onSettingsChange: (newSettings: Partial<TradingSettings>) => void;
  isRunning: boolean;
  onToggleSimulation: () => void;
  onFindOptimal: () => void;
  isOptimizing: boolean;
  optimizationProgress: number;
  isBacktesting: boolean;
  backtestProgress: number;
  tradingMode: 'simulation' | 'live';
  onModeChange: (mode: 'simulation' | 'live') => void;
  isLiveConnected: boolean;
}

const Slider: React.FC<{ label: string; value: number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; disabled: boolean }> = ({ label, value, onChange, disabled }) => (
    <div className="flex-1 min-w-[150px]">
        <div className="flex justify-between text-sm text-slate-400 px-1">
            <span>{label}</span>
            <span className="font-mono text-slate-300">{value}</span>
        </div>
        <input
            type="range"
            min="1"
            max="100"
            value={value}
            onChange={onChange}
            disabled={disabled}
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
         <div className="flex justify-between text-xs text-slate-500 px-1">
            <span>Low</span>
            <span>High</span>
        </div>
    </div>
);

function ControlPanelComponent({ settings, onSettingsChange, isRunning, onToggleSimulation, onFindOptimal, isOptimizing, optimizationProgress, isBacktesting, backtestProgress, tradingMode, onModeChange, isLiveConnected }: ControlPanelProps): React.ReactElement {
  const isLiveMode = tradingMode === 'live';
  const areParamsDisabled = isRunning || isOptimizing || isLiveMode;
  const isStartStopDisabled = isOptimizing || (isLiveMode && !isLiveConnected);

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 border-t border-slate-700 pt-4 mt-4">
      <div className="flex items-center gap-4">
           <div className="flex flex-col text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="h-4 w-4 rounded bg-slate-900 border-slate-600 text-blue-500 focus:ring-blue-500" 
                    checked={tradingMode === 'simulation'}
                    onChange={() => onModeChange('simulation')}
                    />
                  Simulation mode
              </label>
               <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="h-4 w-4 rounded bg-slate-900 border-slate-600 text-blue-500 focus:ring-blue-500" 
                    checked={tradingMode === 'live'}
                    onChange={() => onModeChange('live')}
                    />
                  Real trading mode
              </label>
          </div>
          <button
              onClick={onToggleSimulation}
              disabled={isStartStopDisabled}
              className={`relative overflow-hidden px-8 py-2 rounded-md font-bold text-lg transition-all duration-200 disabled:bg-slate-500 disabled:shadow-none disabled:cursor-not-allowed ${
                isRunning 
                  ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20' 
                  : 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/20'
              }`}
          >
            <span className="relative z-10">{isRunning ? 'Stop' : 'Start'}</span>
            {isRunning && isBacktesting && (
                <div 
                  className="absolute top-0 left-0 h-full bg-red-400/50 transition-all duration-150 ease-linear"
                  style={{ width: `${backtestProgress}%` }}
                ></div>
            )}
          </button>
          <button
              onClick={onFindOptimal}
              disabled={areParamsDisabled}
              className="relative px-8 py-2 rounded-md font-bold text-lg transition-all duration-200 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 disabled:bg-slate-500 disabled:shadow-none disabled:cursor-not-allowed overflow-hidden"
            >
              <span className="relative z-10">{isOptimizing ? 'Optimizing...' : 'Find Optimal'}</span>
              {isOptimizing && (
                <div 
                  className="absolute top-0 left-0 h-full bg-blue-500/50 transition-all duration-200 ease-linear"
                  style={{ width: `${optimizationProgress}%` }}
                ></div>
              )}
            </button>
      </div>

      <div className="flex-grow w-full md:w-auto flex items-center gap-4">
         <Slider 
              label="Risk level" 
              value={settings.riskLevel}
              onChange={(e) => onSettingsChange({ riskLevel: Number(e.target.value) })}
              disabled={areParamsDisabled}
         />
          <Slider 
              label="Dips sensitivity"
              value={settings.dipsSensitivity}
              onChange={(e) => onSettingsChange({ dipsSensitivity: Number(e.target.value) })}
              disabled={areParamsDisabled}
          />
      </div>
    </div>
  );
}

export default React.memo(ControlPanelComponent);