"use client";

import { useCallback, useEffect, useState } from "react";
import { ToolPageShell } from "@/components/ToolPageShell";
import type { Tool } from "@/data/tools";

type HistoryEntry = { expression: string; result: string };

const BUTTONS = [
  ["C", "±", "%", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "−"],
  ["1", "2", "3", "+"],
  ["0", ".", "√", "="],
];

export function CalculatorClient({ tool }: { tool: Tool }) {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [justEvaluated, setJustEvaluated] = useState(false);

  const pushHistory = (expr: string, result: string) => {
    setHistory((prev) => [{ expression: expr, result }, ...prev].slice(0, 10));
  };

  const handleInput = useCallback(
    (value: string) => {
      if (value === "C") {
        setDisplay("0");
        setExpression("");
        setJustEvaluated(false);
        return;
      }

      if (value === "=") {
        if (!expression) return;
        try {
          // Replace display operators with JS operators
          const jsExpr = expression
            .replace(/×/g, "*")
            .replace(/÷/g, "/")
            .replace(/−/g, "-");
          // eslint-disable-next-line no-new-func
          const result = Function(`"use strict"; return (${jsExpr})`)();
          const resultStr =
            typeof result === "number" && isFinite(result)
              ? parseFloat(result.toPrecision(12)).toString()
              : "Error";
          pushHistory(expression, resultStr);
          setDisplay(resultStr);
          setExpression(resultStr === "Error" ? "" : resultStr);
          setJustEvaluated(true);
        } catch {
          setDisplay("Error");
          setExpression("");
          setJustEvaluated(true);
        }
        return;
      }

      if (value === "√") {
        const num = parseFloat(display);
        if (isNaN(num) || num < 0) {
          setDisplay("Error");
          setExpression("");
          setJustEvaluated(true);
          return;
        }
        const result = parseFloat(Math.sqrt(num).toPrecision(12)).toString();
        pushHistory(`√(${display})`, result);
        setDisplay(result);
        setExpression(result);
        setJustEvaluated(true);
        return;
      }

      if (value === "±") {
        const toggled = display.startsWith("-")
          ? display.slice(1)
          : `-${display}`;
        setDisplay(toggled);
        setExpression(toggled);
        return;
      }

      if (value === "%") {
        const num = parseFloat(display);
        if (!isNaN(num)) {
          const result = (num / 100).toString();
          setDisplay(result);
          setExpression(result);
        }
        return;
      }

      const isOperator = ["÷", "×", "−", "+"].includes(value);

      if (isOperator) {
        setJustEvaluated(false);
        setExpression((prev) => {
          const last = prev.slice(-1);
          const isLastOp = ["÷", "×", "−", "+"].includes(last);
          return isLastOp ? prev.slice(0, -1) + value : prev + value;
        });
        setDisplay(value);
        return;
      }

      // Digit or decimal
      if (justEvaluated) {
        setExpression(value === "." ? "0." : value);
        setDisplay(value === "." ? "0." : value);
        setJustEvaluated(false);
        return;
      }

      setExpression((prev) => {
        if (prev === "0" && value !== ".") return value;
        return prev + value;
      });
      setDisplay((prev) => {
        const isLastOp = ["÷", "×", "−", "+"].includes(prev);
        if (isLastOp) return value;
        if (prev === "0" && value !== ".") return value;
        return prev + value;
      });
    },
    [display, expression, justEvaluated],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, string> = {
        "0": "0",
        "1": "1",
        "2": "2",
        "3": "3",
        "4": "4",
        "5": "5",
        "6": "6",
        "7": "7",
        "8": "8",
        "9": "9",
        ".": ".",
        "+": "+",
        "-": "−",
        "*": "×",
        "/": "÷",
        "%": "%",
        Enter: "=",
        "=": "=",
        Escape: "C",
        Backspace: "C",
      };
      if (map[e.key]) {
        e.preventDefault();
        handleInput(map[e.key]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleInput]);

  const btnClass = (label: string) => {
    const isOp = ["÷", "×", "−", "+"].includes(label);
    const isEq = label === "=";
    const isFn = ["C", "±", "%", "√"].includes(label);
    if (isEq)
      return "rounded-xl bg-gradient-brand text-primary-foreground shadow-pop text-lg font-bold transition hover:-translate-y-0.5 active:scale-95";
    if (isOp)
      return "rounded-xl bg-primary/10 text-primary font-semibold text-lg transition hover:bg-primary/20 active:scale-95";
    if (isFn)
      return "rounded-xl bg-muted text-muted-foreground font-medium transition hover:bg-muted/80 active:scale-95";
    return "rounded-xl border border-border bg-card font-medium text-lg transition hover:bg-muted active:scale-95";
  };

  return (
    <ToolPageShell
      tool={tool}
      intro="A clean, fast calculator for everyday maths. Runs entirely in your browser — no data sent anywhere."
      features={[
        {
          title: "Keyboard support",
          desc: "Type numbers and operators directly from your keyboard.",
        },
        {
          title: "Calculation history",
          desc: "See your last 10 calculations at a glance.",
        },
        {
          title: "Percentage & square root",
          desc: "Beyond basic maths without switching apps.",
        },
      ]}
      howTo={[
        "Click the number buttons or type on your keyboard.",
        "Select an operator (+, −, ×, ÷).",
        "Press = or Enter to see the result.",
      ]}
      faqs={[
        {
          q: "Does this calculator store my data?",
          a: "No. Everything runs in your browser and nothing is sent to any server.",
        },
        {
          q: "Can I use it on mobile?",
          a: "Yes. The layout adapts to touchscreen devices.",
        },
      ]}
    >
      <div className="mx-auto max-w-xs">
        {/* Display */}
        <div className="mb-3 rounded-xl border border-border bg-muted/40 px-4 py-3 text-right">
          <div className="min-h-[1.25rem] text-xs text-muted-foreground truncate">
            {expression || "\u00A0"}
          </div>
          <div
            className="mt-1 text-3xl font-bold tracking-tight truncate"
            aria-live="polite"
            aria-label={`Result: ${display}`}
          >
            {display}
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-2">
          {BUTTONS.flat().map((btn, i) => (
            <button
              key={`${btn}-${i}`}
              onClick={() => handleInput(btn)}
              className={`h-14 ${btn === "0" ? "col-span-1" : ""} ${btnClass(btn)}`}
              aria-label={btn}
            >
              {btn}
            </button>
          ))}
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="mt-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              History
            </p>
            <ul className="space-y-1">
              {history.map((h, i) => (
                <li
                  key={i}
                  className="flex justify-between rounded-lg bg-muted/40 px-3 py-1.5 text-xs"
                >
                  <span className="text-muted-foreground">{h.expression}</span>
                  <span className="font-semibold">= {h.result}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </ToolPageShell>
  );
}
