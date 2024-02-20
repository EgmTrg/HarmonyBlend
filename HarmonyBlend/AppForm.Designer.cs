namespace HarmonyBlend
{
	partial class AppForm
	{
		/// <summary>
		/// Required designer variable.
		/// </summary>
		private System.ComponentModel.IContainer components = null;

		/// <summary>
		/// Clean up any resources being used.
		/// </summary>
		/// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
		protected override void Dispose(bool disposing) {
			if(disposing && (components != null)) {
				components.Dispose();
			}
			base.Dispose(disposing);
		}

		#region Windows Form Designer generated code

		/// <summary>
		/// Required method for Designer support - do not modify
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent() {
			panel1 = new Panel();
			button1 = new Button();
			button4 = new Button();
			button2 = new Button();
			button3 = new Button();
			flowLayoutPanel1 = new FlowLayoutPanel();
			button5 = new Button();
			button6 = new Button();
			panel1.SuspendLayout();
			flowLayoutPanel1.SuspendLayout();
			SuspendLayout();
			// 
			// panel1
			// 
			panel1.BackColor = Color.Navy;
			panel1.Controls.Add(button4);
			panel1.Controls.Add(button1);
			panel1.Dock = DockStyle.Top;
			panel1.ForeColor = Color.White;
			panel1.Location = new Point(0, 0);
			panel1.Name = "panel1";
			panel1.Size = new Size(1004, 55);
			panel1.TabIndex = 1;
			// 
			// button1
			// 
			button1.BackColor = Color.Navy;
			button1.FlatStyle = FlatStyle.Flat;
			button1.Font = new Font("Microsoft Sans Serif", 10F);
			button1.ForeColor = Color.White;
			button1.Location = new Point(3, 3);
			button1.Name = "button1";
			button1.Size = new Size(129, 52);
			button1.TabIndex = 0;
			button1.Text = "Menu";
			button1.UseVisualStyleBackColor = false;
			// 
			// button4
			// 
			button4.BackColor = Color.Navy;
			button4.FlatAppearance.BorderSize = 0;
			button4.FlatStyle = FlatStyle.Flat;
			button4.Font = new Font("Microsoft Sans Serif", 10F);
			button4.ForeColor = Color.White;
			button4.Location = new Point(933, 3);
			button4.Name = "button4";
			button4.Size = new Size(59, 44);
			button4.TabIndex = 2;
			button4.Text = "Kapat";
			button4.UseVisualStyleBackColor = false;
			// 
			// button2
			// 
			button2.BackColor = Color.Navy;
			button2.FlatAppearance.BorderSize = 0;
			button2.FlatStyle = FlatStyle.Flat;
			button2.Font = new Font("Segoe UI Semibold", 12F, FontStyle.Bold);
			button2.ForeColor = Color.White;
			button2.Location = new Point(3, 69);
			button2.Name = "button2";
			button2.Size = new Size(129, 60);
			button2.TabIndex = 4;
			button2.Text = "Sipariş";
			button2.UseVisualStyleBackColor = false;
			// 
			// button3
			// 
			button3.BackColor = Color.Navy;
			button3.FlatAppearance.BorderSize = 0;
			button3.FlatStyle = FlatStyle.Flat;
			button3.Font = new Font("Segoe UI Semibold", 12F, FontStyle.Bold);
			button3.ForeColor = Color.White;
			button3.Location = new Point(3, 3);
			button3.Name = "button3";
			button3.Size = new Size(129, 60);
			button3.TabIndex = 4;
			button3.Text = "Ana Ekran";
			button3.UseVisualStyleBackColor = false;
			// 
			// flowLayoutPanel1
			// 
			flowLayoutPanel1.BackColor = Color.Navy;
			flowLayoutPanel1.Controls.Add(button3);
			flowLayoutPanel1.Controls.Add(button2);
			flowLayoutPanel1.Controls.Add(button5);
			flowLayoutPanel1.Controls.Add(button6);
			flowLayoutPanel1.Dock = DockStyle.Left;
			flowLayoutPanel1.Location = new Point(0, 55);
			flowLayoutPanel1.Name = "flowLayoutPanel1";
			flowLayoutPanel1.Size = new Size(136, 529);
			flowLayoutPanel1.TabIndex = 5;
			// 
			// button5
			// 
			button5.BackColor = Color.Navy;
			button5.FlatAppearance.BorderSize = 0;
			button5.FlatStyle = FlatStyle.Flat;
			button5.Font = new Font("Segoe UI Semibold", 12F, FontStyle.Bold);
			button5.ForeColor = Color.White;
			button5.Location = new Point(3, 135);
			button5.Name = "button5";
			button5.Size = new Size(129, 60);
			button5.TabIndex = 4;
			button5.Text = "Ana Ekran";
			button5.UseVisualStyleBackColor = false;
			// 
			// button6
			// 
			button6.BackColor = Color.Navy;
			button6.FlatAppearance.BorderSize = 0;
			button6.FlatStyle = FlatStyle.Flat;
			button6.Font = new Font("Segoe UI Semibold", 12F, FontStyle.Bold);
			button6.ForeColor = Color.White;
			button6.Location = new Point(3, 201);
			button6.Name = "button6";
			button6.Size = new Size(129, 60);
			button6.TabIndex = 4;
			button6.Text = "Ana Ekran";
			button6.UseVisualStyleBackColor = false;
			// 
			// AppForm
			// 
			AutoScaleDimensions = new SizeF(7F, 15F);
			AutoScaleMode = AutoScaleMode.Font;
			ClientSize = new Size(1004, 584);
			Controls.Add(flowLayoutPanel1);
			Controls.Add(panel1);
			ForeColor = Color.Silver;
			FormBorderStyle = FormBorderStyle.None;
			Name = "AppForm";
			Text = "AppForm";
			panel1.ResumeLayout(false);
			flowLayoutPanel1.ResumeLayout(false);
			ResumeLayout(false);
		}

		#endregion

		private Panel panel1;
		private Button button4;
		private Button button1;
		private Button button2;
		private Button button3;
		private FlowLayoutPanel flowLayoutPanel1;
		private Button button5;
		private Button button6;
	}
}