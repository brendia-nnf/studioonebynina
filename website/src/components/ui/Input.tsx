'use client';

import { forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(!!e.target.value);
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value);
      if (props.onChange) {
        props.onChange(e);
      }
    };

    const inputId = id || label.toLowerCase().replace(/\s/g, '-');

    return (
      <div className="relative">
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'peer w-full px-4 py-4 bg-transparent border-b-2 border-charcoal-200 font-sans text-body-md text-charcoal-800 placeholder-transparent transition-all duration-300 focus:outline-none focus:border-gold-400',
            error && 'border-red-500 focus:border-red-500',
            className
          )}
          placeholder={label}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        />
        <label
          htmlFor={inputId}
          className={cn(
            'absolute left-4 transition-all duration-300 pointer-events-none font-sans',
            isFocused || hasValue
              ? '-top-2 text-label-md text-gold-400'
              : 'top-4 text-body-md text-charcoal-400',
            error && 'text-red-500'
          )}
        >
          {label}
        </label>
        {error && (
          <p className="mt-1 text-body-sm text-red-500 font-sans">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      setHasValue(!!e.target.value);
    };
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setHasValue(!!e.target.value);
      if (props.onChange) {
        props.onChange(e);
      }
    };

    const inputId = id || label.toLowerCase().replace(/\s/g, '-');

    return (
      <div className="relative">
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            'peer w-full px-4 py-4 bg-transparent border-b-2 border-charcoal-200 font-sans text-body-md text-charcoal-800 placeholder-transparent transition-all duration-300 focus:outline-none focus:border-gold-400 resize-none min-h-[120px]',
            error && 'border-red-500 focus:border-red-500',
            className
          )}
          placeholder={label}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        />
        <label
          htmlFor={inputId}
          className={cn(
            'absolute left-4 transition-all duration-300 pointer-events-none font-sans',
            isFocused || hasValue
              ? '-top-2 text-label-md text-gold-400'
              : 'top-4 text-body-md text-charcoal-400',
            error && 'text-red-500'
          )}
        >
          {label}
        </label>
        {error && (
          <p className="mt-1 text-body-sm text-red-500 font-sans">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
