namespace HarmonyBlend.Pages
{
	partial class Order
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
			label1 = new Label();
			panel3 = new Panel();
			panel2 = new Panel();
			dataGridView1 = new DataGridView();
			Column7 = new DataGridViewCheckBoxColumn();
			Column1 = new DataGridViewImageColumn();
			Column2 = new DataGridViewTextBoxColumn();
			Column3 = new DataGridViewTextBoxColumn();
			Column6 = new DataGridViewTextBoxColumn();
			Column4 = new DataGridViewTextBoxColumn();
			Column5 = new DataGridViewTextBoxColumn();
			panel1.SuspendLayout();
			panel2.SuspendLayout();
			((System.ComponentModel.ISupportInitialize)dataGridView1).BeginInit();
			SuspendLayout();
			// 
			// panel1
			// 
			panel1.Controls.Add(label1);
			panel1.Dock = DockStyle.Top;
			panel1.Location = new Point(0, 0);
			panel1.Name = "panel1";
			panel1.Size = new Size(1233, 56);
			panel1.TabIndex = 0;
			// 
			// label1
			// 
			label1.Anchor = AnchorStyles.None;
			label1.AutoSize = true;
			label1.BackColor = Color.FromArgb(54, 64, 78);
			label1.Font = new Font("Castellar", 22.25F);
			label1.ForeColor = Color.White;
			label1.Location = new Point(12, 9);
			label1.Name = "label1";
			label1.Size = new Size(225, 36);
			label1.TabIndex = 1;
			label1.Text = "ORDER PAGE";
			// 
			// panel3
			// 
			panel3.Dock = DockStyle.Bottom;
			panel3.Location = new Point(0, 522);
			panel3.Name = "panel3";
			panel3.Size = new Size(1233, 130);
			panel3.TabIndex = 1;
			// 
			// panel2
			// 
			panel2.Controls.Add(dataGridView1);
			panel2.Dock = DockStyle.Fill;
			panel2.Location = new Point(0, 56);
			panel2.Name = "panel2";
			panel2.Size = new Size(1233, 466);
			panel2.TabIndex = 2;
			// 
			// dataGridView1
			// 
			dataGridView1.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill;
			dataGridView1.AutoSizeRowsMode = DataGridViewAutoSizeRowsMode.DisplayedCells;
			dataGridView1.Columns.AddRange(new DataGridViewColumn[] { Column7, Column1, Column2, Column3, Column6, Column4, Column5 });
			dataGridView1.Dock = DockStyle.Fill;
			dataGridView1.Location = new Point(0, 0);
			dataGridView1.Name = "dataGridView1";
			dataGridView1.Size = new Size(1233, 466);
			dataGridView1.TabIndex = 0;
			// 
			// Column7
			// 
			Column7.HeaderText = "Check";
			Column7.Name = "Column7";
			// 
			// Column1
			// 
			Column1.HeaderText = "Image";
			Column1.Name = "Column1";
			Column1.ReadOnly = true;
			// 
			// Column2
			// 
			Column2.HeaderText = "Product Code";
			Column2.Name = "Column2";
			Column2.ReadOnly = true;
			// 
			// Column3
			// 
			Column3.HeaderText = "Product Name";
			Column3.Name = "Column3";
			Column3.ReadOnly = true;
			// 
			// Column6
			// 
			Column6.HeaderText = "Unit";
			Column6.Name = "Column6";
			Column6.ReadOnly = true;
			// 
			// Column4
			// 
			Column4.HeaderText = "List Price";
			Column4.Name = "Column4";
			Column4.ReadOnly = true;
			// 
			// Column5
			// 
			Column5.HeaderText = "Amount";
			Column5.Name = "Column5";
			// 
			// Order
			// 
			AutoScaleDimensions = new SizeF(7F, 15F);
			AutoScaleMode = AutoScaleMode.Font;
			BackColor = Color.FromArgb(39, 47, 59);
			ClientSize = new Size(1233, 652);
			Controls.Add(panel2);
			Controls.Add(panel3);
			Controls.Add(panel1);
			FormBorderStyle = FormBorderStyle.None;
			Name = "Order";
			Text = "SubPage1";
			panel1.ResumeLayout(false);
			panel1.PerformLayout();
			panel2.ResumeLayout(false);
			((System.ComponentModel.ISupportInitialize)dataGridView1).EndInit();
			ResumeLayout(false);
		}

		#endregion

		private Panel panel1;
		private Panel panel3;
		private Panel panel2;
		private DataGridView dataGridView1;
		private Label label1;
		private DataGridViewCheckBoxColumn Column7;
		private DataGridViewImageColumn Column1;
		private DataGridViewTextBoxColumn Column2;
		private DataGridViewTextBoxColumn Column3;
		private DataGridViewTextBoxColumn Column6;
		private DataGridViewTextBoxColumn Column4;
		private DataGridViewTextBoxColumn Column5;
	}
}