namespace HarmonyBlend
{
	partial class TestForm
	{
		/// <summary>
		///  Required designer variable.
		/// </summary>
		private System.ComponentModel.IContainer components = null;

		/// <summary>
		///  Clean up any resources being used.
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
		///  Required method for Designer support - do not modify
		///  the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent() {
			button1 = new Button();
			test_button = new Button();
			dataGridView1 = new DataGridView();
			button2 = new Button();
			((System.ComponentModel.ISupportInitialize)dataGridView1).BeginInit();
			SuspendLayout();
			// 
			// button1
			// 
			button1.Font = new Font("Segoe UI", 15.75F, FontStyle.Regular, GraphicsUnit.Point, 162);
			button1.Location = new Point(277, 376);
			button1.Name = "button1";
			button1.Size = new Size(167, 51);
			button1.TabIndex = 1;
			button1.Text = "Exit";
			button1.UseVisualStyleBackColor = true;
			button1.Click += button1_Click;
			// 
			// test_button
			// 
			test_button.Font = new Font("Segoe UI", 15.75F, FontStyle.Regular, GraphicsUnit.Point, 162);
			test_button.Location = new Point(623, 376);
			test_button.Name = "test_button";
			test_button.Size = new Size(167, 51);
			test_button.TabIndex = 1;
			test_button.Text = "TestButton";
			test_button.UseVisualStyleBackColor = true;
			test_button.Click += test_button_Click;
			// 
			// dataGridView1
			// 
			dataGridView1.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
			dataGridView1.Location = new Point(12, 12);
			dataGridView1.Name = "dataGridView1";
			dataGridView1.Size = new Size(778, 358);
			dataGridView1.TabIndex = 2;
			// 
			// button2
			// 
			button2.Font = new Font("Segoe UI", 15.75F, FontStyle.Regular, GraphicsUnit.Point, 162);
			button2.Location = new Point(450, 376);
			button2.Name = "button2";
			button2.Size = new Size(167, 51);
			button2.TabIndex = 1;
			button2.Text = "TestButton2";
			button2.UseVisualStyleBackColor = true;
			button2.Click += button2_Click;
			// 
			// TestForm
			// 
			AutoScaleDimensions = new SizeF(7F, 15F);
			AutoScaleMode = AutoScaleMode.Font;
			ClientSize = new Size(802, 439);
			Controls.Add(dataGridView1);
			Controls.Add(button2);
			Controls.Add(test_button);
			Controls.Add(button1);
			Name = "TestForm";
			Text = "Form1";
			((System.ComponentModel.ISupportInitialize)dataGridView1).EndInit();
			ResumeLayout(false);
		}

		#endregion
		private Button button1;
		private Button test_button;
		private DataGridView dataGridView1;
		private Button button2;
	}
}
