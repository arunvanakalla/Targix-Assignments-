import React from "react";
import { useGlobal } from "./context/GlobalContext";
import TaskList from "./components/TaskList";
import AddTaskForm from "./components/AddTaskForm";
import TaskSummary from "./components/TaskSummary";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/Theme";
import { Container, Card, Grid, SectionTitle, Title, Subtitle, ToggleWrapper, ToggleLabel, ToggleThumb, Hero, StatGrid, StatCard, StatLabel, StatValue, AccentPill, Logo, Column } from "./styles/Styled";

export default function App() {
  const {state, dispatch } = useGlobal();
  const isDark = state.theme !== "light";

  const total = state.tasks.length;
  const completed = state.tasks.filter(t => t.completed).length;
  const pending = total - completed;

  return (
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <Container>
          <Hero>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Logo src="/checklist.svg" alt="Checklist logo" />
                <Title>Task Manager</Title>
              </div>
              <Subtitle>Organize, track and complete your tasks efficiently</Subtitle>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <AccentPill>Theme</AccentPill>
              <ToggleWrapper>
                <ToggleLabel onClick={() => dispatch({ type: "TOGGLE_THEME" })}>
                  {isDark ? "Dark" : "Light"} mode
                  <ToggleThumb $on={isDark} />
                </ToggleLabel>
              </ToggleWrapper>
            </div>
          </Hero>

          <Card style={{ marginTop: 16 }}>
            <StatGrid>
              <StatCard>
                <StatLabel>Total</StatLabel>
                <StatValue>{total}</StatValue>
              </StatCard>
              <StatCard>
                <StatLabel>Completed</StatLabel>
                <StatValue>{completed}</StatValue>
              </StatCard>
              <StatCard>
                <StatLabel>Pending</StatLabel>
                <StatValue>{pending}</StatValue>
              </StatCard>
            </StatGrid>
          </Card>

          <Grid>
            <Column>
              <Card>
                <SectionTitle>Progress</SectionTitle>
                <TaskSummary/>
              </Card>
              <Card>
                <SectionTitle>Add Task</SectionTitle>
                <AddTaskForm/>
              </Card>
            </Column>
            <div>
              <Card>
                <SectionTitle>Tasks</SectionTitle>
                <TaskList/>
              </Card>
            </div>
          </Grid>

          <div style={{ marginTop: 16 }}>
            <Card>
              <div style={{ textAlign: 'center', fontSize: 12, opacity: 0.8 }}>
                Built with React, Context, and styled-components
              </div>
            </Card>
          </div>
        </Container>
      </ThemeProvider>
  );
}